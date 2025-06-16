import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

const CoachingForm = () => {
  const form = useRef();
  const [captchaCode, setCaptchaCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (userInput !== captchaCode) {
      alert("Il codice di verifica è errato.");
      return;
    }

    const formEl = form.current;
    const formData = {
      name: formEl.user_name.value,
      surname: formEl.user_surname.value,
      email: formEl.user_email.value,
    };

    setIsSending(true);

    try {
      // 1. Invia a EmailJS
      await emailjs.sendForm(
        "service_kuh0m4i",
        "template_g59pvit",
        formEl,
        "YgptsrhslOdmh_-3d"
      );

      // 2. Invia alla Serverless API di Brevo
      const res = await fetch("/api/sendBrevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Errore durante l'invio a Brevo");

      alert("Messaggio inviato! Ti contatterò presto 💪");
      formEl.reset();
      setUserInput("");
      generateCaptcha();
    } catch (err) {
      console.error("Errore:", err);
      alert("Errore durante l'invio, riprova.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 font-[Poppins]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-2">
          Coaching Online
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Compila il modulo qui sotto per essere ricontattato 💪
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="md:flex md:space-x-4">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                name="user_name"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">
                Cognome
              </label>
              <input
                name="user_surname"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="user_email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ti sei mai allenato prima?
            </label>
            <select
              name="user_trained_before"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="">Seleziona una risposta</option>
              <option value="Si">Sì</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Verifica</label>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 font-bold px-4 py-2 rounded text-lg tracking-widest select-none">
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-blue-600 hover:underline text-sm"
              >
                Genera nuovo
              </button>
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value.toUpperCase())}
              placeholder="Inserisci il codice sopra"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className={`w-full ${
              isSending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-3 px-6 rounded-lg transition duration-300`}
          >
            {isSending ? "Invio in corso..." : "Invia richiesta"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachingForm;