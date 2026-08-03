import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(__dirname, "dist")));

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.post("/api/contact", async (req, res) => {
  try {
    const { nome, email, messaggio, piano } = req.body || {};

    if (!nome || !email || !messaggio) {
      return res.status(400).json({ error: "Nome, email e messaggio sono obbligatori" });
    }

    if (typeof nome !== "string" || nome.trim().length === 0 || nome.length > 200) {
      return res.status(400).json({ error: "Nome non valido" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 200) {
      return res.status(400).json({ error: "Email non valida" });
    }

    if (typeof messaggio !== "string" || messaggio.trim().length === 0 || messaggio.length > 5000) {
      return res.status(400).json({ error: "Messaggio non valido (massimo 5000 caratteri)" });
    }

    const safeNome = escapeHtml(nome.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessaggio = escapeHtml(messaggio.trim()).replace(/\n/g, "<br>");
    const safePiano = piano ? escapeHtml(String(piano)) : null;

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
        subject: "Nuova richiesta da " + nome.trim() + (piano ? " — Piano: " + piano : ""),
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

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Sognalo server running on port " + PORT);
});
