const allowedOrigins = new Set([
  "http://acolomba.site",
  "https://acolomba.site",
  "http://www.acolomba.site",
  "https://www.acolomba.site",
]);

function setCors(req, res) {
  const origin = req.headers.origin;
  res.setHeader(
    "Access-Control-Allow-Origin",
    allowedOrigins.has(origin) ? origin : "https://acolomba.site"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: "Telegram delivery is not configured" });
  }

  const name = clean(req.body?.name, 120);
  const replyTo = clean(req.body?.replyTo, 180);
  const message = clean(req.body?.message, 2500);
  const page = clean(req.body?.page, 300);

  if (!name || !replyTo || !message) {
    return res.status(400).json({ error: "Name, reply contact, and message are required" });
  }

  const text = [
    "acolomba.site message",
    "",
    `Name: ${name}`,
    `Reply: ${replyTo}`,
    page ? `Page: ${page}` : "",
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    return res.status(502).json({ error: "Telegram rejected the message" });
  }

  return res.status(200).json({ ok: true });
}
