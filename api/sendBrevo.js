export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.warn("⛔ Metodo non permesso:", req.method);
    return res.status(405).json({ error: "Metodo non permesso" });
  }

  const { email, name, surname } = req.body;

  try {
    const brevoBody = {
      email,
      attributes: {
        FIRSTNAME: name,
        LASTNAME: surname,
      },
      listIds: [3],
    };

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(brevoBody),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.code === "duplicate_parameter") {
        console.warn(`⚠️ Email già registrata: ${email}`);
        return res.status(409).json({ error: "Email già registrata" });
      }

      console.error("❌ Errore da Brevo:", result);
      return res.status(400).json({ error: result });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("🔥 Errore nel contatto Brevo:", error);
    return res.status(500).json({ error: "Errore nel contatto Brevo" });
  }
}