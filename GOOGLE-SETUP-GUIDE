# ⚡ GOOGLE GOD MODE: SETUP GUIDE

Replace complex n8n servers with Google's free, serverless power.

## 1. Create the Backend
1. Go to [script.google.com](https://script.google.com/home).
2. Click **New Project**.
3. Name it `Delray God Mode`.
4. Delete any code in `Code.gs` and paste the contents of `GOOGLE-GOD-MODE.gs`.

## 2. Configure & Enable Services
1. **Enable Calendar**:
   - On the left sidebar, click **Services (+)**.
   - Select **Google Calendar API** -> Click **Add**.
2. **Update Config**:
   - At the top of `Code.gs`, ensure `NOTIFY_EMAIL` is your email (`firstlookequities2@gmail.com`).
   - `BITRIX_WEBHOOK_URL` is already set.

## 3. Deploy
1. Click the blue **Deploy** button (top right) -> **New Deployment**.
2. Click the specific **Select type** gear icon -> **Web App**.
3. **Description**: `v1 God Mode`.
4. **Execute as**: `Me` (This allows it to access your Gmail/Sheets).
5. **Who has access**: `Anyone` (CRITICAL: This allows your website to send data to it).
6. Click **Deploy**.
7. **Authorize Access**: Google will ask for permission to use your Gmail/Sheets. Click Review Permissions -> Advanced -> Go to Delray God Mode (unsafe) -> Allow.
8. **COPY THE WEB APP URL** (It ends in `/exec`).

## 4. Connect Website
1. Open `config.js` in your website folder.
2. Paste the URL into `googleAppsScriptUrl`.
3. Set `useGoogleBackend: true`.

Done! Your site now saves to Sheets, syncs to Bitrix, and sends emails from your Gmail account entirely serverlessly. 🥂
