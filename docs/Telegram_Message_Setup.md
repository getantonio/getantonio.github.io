# Telegram Message Box Setup

The site form is built, but Telegram delivery needs a private serverless endpoint. Do not put a Telegram bot token in the public HTML.

## Create the Telegram bot

1. Open Telegram in Brave.
2. Message `@BotFather`.
3. Send `/newbot`.
4. Follow the prompts and copy the bot token.
5. Open the new bot and send it any message, such as `hello`.

## Get Antonio's chat ID

After sending the bot a message, open this URL in Brave, replacing `<BOT_TOKEN>`:

```text
https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
```

Find the numeric `chat.id`. That is `TELEGRAM_CHAT_ID`.

## Deploy the Worker

Use `workers/telegram-message-worker.js` as the Cloudflare Worker source.

Set these Worker secrets:

```text
TELEGRAM_BOT_TOKEN=<BotFather token>
TELEGRAM_CHAT_ID=<numeric chat id>
```

After the Worker is deployed, copy its URL into the site form:

```html
<form class="message-form" data-message-form data-endpoint="https://YOUR-WORKER.workers.dev">
```

Then push the site again.
