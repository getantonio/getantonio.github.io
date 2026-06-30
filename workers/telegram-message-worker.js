const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json({ error: "Telegram delivery is not configured" }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const name = clean(body.name, 120);
    const replyTo = clean(body.replyTo, 180);
    const message = clean(body.message, 2500);
    const page = clean(body.page, 300);

    if (!name || !replyTo || !message) {
      return json({ error: "Name, reply contact, and message are required" }, 400);
    }

    const text = [
      "New site message",
      "",
      `Name: ${name}`,
      `Reply: ${replyTo}`,
      page ? `Page: ${page}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
      }
    );

    if (!telegramResponse.ok) {
      return json({ error: "Telegram rejected the message" }, 502);
    }

    return json({ ok: true });
  },
};
