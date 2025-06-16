import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const CoachingForm = () => {
  const form = useRef();

  const addToBrevo = async (data) => {
    try {
      const response = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": import.meta.env.VITE_BREVO_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          attributes: {
            FIRSTNAME: data.name,
            LASTNAME: data.surname
          },
          listIds: [3]
        })
      });

      const result = await response.json();
      console.log("Risposta Brevo:", result);
    } catch (error) {
      console.error("Errore Brevo:", error);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formEl = form.current;
    const formData = {
      name: formEl.user_name.value,
      surname: formEl.user_surname.value,
      email: formEl.user_email.value,
    };

    emailjs.sendForm(
      'service_kuh0m4i',
      'template_g59pvit',
      formEl,
      'YgptsrhslOdmh_-3d'
    ).then(() => {
      addToBrevo(formData); // ➕ invia anche a Brevo
      alert('Messaggio inviato! Ti contatterò presto 💪');
      formEl.reset();
    }).catch((error) => {
      console.error('Errore EmailJS:', error);
      alert("Errore durante l'invio, riprova.");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 font-[Poppins]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-2">Coaching Online</h1>
        <p className="text-center text-gray-600 mb-8">Compila il modulo qui sotto per essere ricontattato e iniziare il tuo percorso personalizzato 💪</p>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="md:flex md:space-x-4">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input name="user_name" type="text" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">Cognome</label>
              <input name="user_surname" type="text" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="user_email" type="email" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ti sei mai allenato prima?</label>
            <select name="user_trained_before" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleziona una risposta</option>
              <option value="Si">Sì</option>
              <option value="No">No</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Invia richiesta
          </button>
        </form>
      </div>
      <div className="mt-10 w-full max-w-2xl">
        <img src="https://source.unsplash.com/800x400/?fitness,training" alt="Fitness" className="rounded-xl shadow-lg w-full object-cover" />
      </div>
    </div>
  );
};

export default CoachingForm;