export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non permesso" });
  }

  const { email, name, surname } = req.body;

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name,
          LASTNAME: surname,
        },
        listIds: [3],
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: result });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ error: "Errore nel contatto Brevo" });
  }
}