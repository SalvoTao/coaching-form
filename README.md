# Coaching Form Tailwind

## 📝 Descrizione generale

Web app per la raccolta di richieste di contatto per servizi di coaching online. Permette agli utenti di inviare i propri dati tramite un form moderno, sicuro e responsive.

---

## 🛠️ Stack Tecnologico

| Tecnologia         | Ruolo/Funzione                                                                 |
|--------------------|-------------------------------------------------------------------------------|
| **React**          | Framework principale per la UI e la gestione dello stato                      |
| **Vite**           | Dev server e build tool per progetti React                                    |
| **Tailwind CSS**   | Framework utility-first per la stilizzazione rapida e responsive              |
| **EmailJS**        | Servizio per l’invio di email direttamente dal frontend                       |
| **Brevo API**      | (ex Sendinblue) API per aggiungere i contatti a una lista marketing           |
| **PostCSS**        | Strumento per la trasformazione dei CSS (usato con Tailwind)                  |
| **Autoprefixer**   | Plugin PostCSS per aggiungere i prefissi CSS automaticamente                  |
| **React Google reCAPTCHA** | (opzionale) Per una protezione aggiuntiva contro lo spam              |

---

## 📦 Struttura delle cartelle

```
coaching-form-tailwind/
│
├── public/                # File statici pubblici
├── src/
│   ├── App.jsx            # Componente principale con il form
│   ├── main.jsx           # Entry point React
│   ├── index.css          # Import Tailwind e stili globali
│   └── api/
│       └── sendBrevo.js   # API serverless per invio dati a Brevo
│
├── index.html             # Entry point HTML
├── tailwind.config.js     # Configurazione Tailwind
├── postcss.config.js      # Configurazione PostCSS
├── package.json           # Script, dipendenze e metadati progetto
└── README.md
```

---

## ⚙️ Funzionamento dettagliato

1. **Compilazione form**: L’utente inserisce nome, cognome, email e risponde a una domanda.
2. **Verifica CAPTCHA**: Sistema CAPTCHA custom (generato lato client) per evitare invii automatici.
3. **Invio dati**:
   - **EmailJS**: I dati vengono inviati via email al coach.
   - **API Brevo**: I dati vengono inviati tramite una chiamata POST a `/api/sendBrevo`, che li inoltra a Brevo per l’inserimento in una lista contatti.
4. **Feedback**: L’utente riceve messaggi di successo o errore a seconda dell’esito delle operazioni.
5. **Reset**: Il form si resetta e il CAPTCHA viene rigenerato.

---

## 🔒 Sicurezza & Best Practice

- **Validazione campi**: Tutti i campi sono obbligatori e validati lato client.
- **Protezione dallo spam**: CAPTCHA custom e possibilità di integrare Google reCAPTCHA.
- **Gestione chiavi API**: Le chiavi sensibili vanno inserite in variabili ambiente e mai committate.

---

## 🚀 Avvio rapido

```bash
npm install         # Installa le dipendenze
npm run dev         # Avvia il server di sviluppo (Vite)
```
Visita [http://localhost:5173](http://localhost:5173) nel browser.

---

## 🔧 Personalizzazione

- **Chiavi API**: Inserisci le tue chiavi EmailJS e Brevo nelle variabili ambiente o nei file di configurazione.
- **UI**: Modifica `App.jsx` per cambiare testi, colori, logica del form.
- **Campi aggiuntivi**: Puoi aggiungere altri campi al form e gestirli sia su EmailJS che su Brevo.

---

## 📚 Dipendenze principali

- `react`, `react-dom`
- `vite`
- `tailwindcss`, `postcss`, `autoprefixer`
- `@emailjs/browser`, `emailjs-com`
- `react-google-recaptcha` (opzionale)