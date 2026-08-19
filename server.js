import express from "express";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Dietro Coolify/reverse proxy: serve per far vedere a express-rate-limit
// l'IP reale del client (X-Forwarded-For) invece di quello del proxy.
app.set("trust proxy", 1);
app.disable("x-powered-by");

if (!process.env.RESEND_API_KEY) {
  console.warn("ATTENZIONE: RESEND_API_KEY non impostata — il form di contatto non funzionerà.");
}

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(express.json({ limit: "32kb" }));

// Gli asset buildati da Vite hanno hash nel nome: cache lunga e immutable.
// index.html è escluso (index: false) e servito dal fallback SPA con no-cache.
app.use(
  express.static(path.join(__dirname, "dist"), {
    index: false,
    maxAge: "1y",
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  })
);

// --- Whitelist valori ammessi per il parametro "piano" ---
const ALLOWED_PIANI = ["Sprint", "Partner", "Launch", "Co-founder", "Mensile"];

// --- Rate limiter per l'endpoint /api/contact ---
// 5 richieste ogni 15 minuti per IP — previene abuso/spam su endpoint pubblico
// che invia email via Resend (servizio a pagamento).
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 5, // max 5 richieste per finestra per IP
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false, // disabilita X-RateLimit-* headers
  message: {
    error: "Troppe richieste. Riprova tra qualche minuto.",
  },
});

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { nome, email, messaggio, piano } = req.body || {};

    // --- Validazione campi obbligatori ---
    if (!nome || !email || !messaggio) {
      return res.status(400).json({ error: "Nome, email e messaggio sono obbligatori" });
    }

    if (typeof nome !== "string" || nome.trim().length === 0 || nome.length > 200) {
      return res.status(400).json({ error: "Nome non valido" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email) || email.length > 200) {
      return res.status(400).json({ error: "Email non valida" });
    }

    if (typeof messaggio !== "string" || messaggio.trim().length === 0 || messaggio.length > 5000) {
      return res.status(400).json({ error: "Messaggio non valido (massimo 5000 caratteri)" });
    }

    // --- Validazione whitelist per "piano" ---
    // Accetta solo valori nella whitelist o null/undefined (campo opzionale).
    // Qualsiasi altro valore viene respinto con 400.
    let validatedPiano = null;
    if (piano !== undefined && piano !== null && piano !== "") {
      if (typeof piano !== "string" || !ALLOWED_PIANI.includes(piano)) {
        return res.status(400).json({ error: "Piano selezionato non valido" });
      }
      validatedPiano = piano;
    }

    // --- Sanificazione per output HTML ---
    const safeNome = escapeHtml(nome.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessaggio = escapeHtml(messaggio.trim()).replace(/\n/g, "<br>");
    const safePiano = validatedPiano ? escapeHtml(validatedPiano) : null;

    const html = [
      '<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">',
      '<h2 style="color: #6366f1; margin-bottom: 24px;">Nuova richiesta da Sognalo</h2>',
      '<table style="width: 100%; border-collapse: collapse;">',
      '<tr><td style="padding: 8px 0; font-weight: 600; color: #334155; width: 120px;">Nome:</td><td style="padding: 8px 0; color: #64748b;">' + safeNome + '</td></tr>',
      '<tr><td style="padding: 8px 0; font-weight: 600; color: #334155;">Email:</td><td style="padding: 8px 0; color: #64748b;">' + safeEmail + '</td></tr>',
      safePiano ? '<tr><td style="padding: 8px 0; font-weight: 600; color: #334155;">Piano:</td><td style="padding: 8px 0; color: #64748b;">' + safePiano + '</td></tr>' : '',
      '</table>',
      '<h3 style="color: #334155; margin-top: 24px; margin-bottom: 8px;">Messaggio:</h3>',
      '<div style="padding: 16px; background: #f8fafc; border-radius: 12px; color: #64748b; line-height: 1.6;">' + safeMessaggio + '</div>',
      '<p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">Questa email è stata inviata tramite il form di contatto su sognalo.it</p>',
      '</div>',
    ].join("");

    // Subject: usa validatedPiano (valore dalla whitelist, già sicuro)
    const subject = validatedPiano
      ? "Nuova richiesta da " + nome.trim() + " — Piano: " + validatedPiano
      : "Nuova richiesta da " + nome.trim();

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Sognalo <noreply@costanza.dev>",
        to: ["lorecucchini@gmail.com"],
        reply_to: email.trim(),
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend error:", errorText);
      return res.status(502).json({ error: "Errore nell'invio dell'email. Riprova più tardi." });
    }

    return res.status(200).json({ success: true, message: "Richiesta inviata con successo!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Errore interno del server" });
  }
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Endpoint non trovato" });
});

app.get("*", (_req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Sognalo server running on port " + PORT);
});
