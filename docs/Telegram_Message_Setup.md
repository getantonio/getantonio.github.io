# Telegram Message Box Setup

The site form is built, but Telegram delivery needs a private serverless endpoint. Do not put a Telegram bot token in the public HTML.

## Create the clean Telegram bot

1. Open Telegram in Brave.
2. Message `@BotFather`.
3. Send `/newbot`.
4. Use this bot display name:

```text
acolomba
```

5. Use this bot username:

```text
acolomba_bot
```

Telegram bot usernames must end in `bot`, so `acolomba.site` is not valid as a username. If BotFather says `acolomba_bot` is unavailable, use `acolomba_site_bot` as the fallback username.

6. Copy the bot token.
7. Open the new bot and send it any message, such as `hello`.

Do not reuse the old `dummlight_bot` / `dummylight_bot` identity for this site.

## Get Antonio's chat ID

After sending the bot a message, open this URL in Brave, replacing `<BOT_TOKEN>`:

```text
https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
```

Find the numeric `chat.id`. That is `TELEGRAM_CHAT_ID`.

## Deploy the Worker

Use `workers/telegram-message-worker.js` as the Cloudflare Worker source.

Set or replace these Worker secrets:

```text
TELEGRAM_BOT_TOKEN=<BotFather token>
TELEGRAM_CHAT_ID=<numeric chat id>
```

If the Worker already exists, replacing `TELEGRAM_BOT_TOKEN` with the new `acolomba_bot` token is enough. The site form can keep using the same Worker URL after the Worker secret is updated.

After the Worker is deployed, copy its URL into the site form:

```html
<form class="message-form" data-message-form data-endpoint="https://YOUR-WORKER.workers.dev">
```

Then push the site again.

## Current endpoint

The form is currently wired to:

```text
https://antonio-telegram-message.pine-porter.workers.dev
```

This was created as a temporary Cloudflare Worker. Claim or redeploy it under Antonio's Cloudflare account for a durable production endpoint.
