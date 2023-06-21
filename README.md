# pilcc-simple

<b>Old and more lightweight version of [Pilcc](https://pilc.cc).</b><br>
The new repo is for now private.<br><br>

Built with ExpressJS, EJS and TailwindCSS.<br>
Utilizes the `qrcodejs` library to display a QR code after clip creation.<br><br>

## Appwrite Functions

- delete-expired-clips<br>

Deploy to Appwrite:<br>
- `npm install -g appwrite-cli`
- `appwrite login`
- edit the appwrite.json
- `appwrite deploy function` <br><br>

## Development

- `npm install`
- In the root folder create a `.env` file with the following variables with your values:
```
APPWRITE_ENDPOINT="..."
APPWRITE_API_KEY="..."
PROJECT_ID="..."
CLIP_DATABASE_ID="..."
CLIP_COLLECTION_ID="..."
```
- Update deploy values in `ecosystem.config.js`
- Open two terminals and run `npm run style` and `npm run test`

## Deployment with PM2

[Server setup guide](https://notes.ciliscu.com/40683/setup-easy-node-js-app-deployment-with-pm2-on-a-caddy-server-ubuntu)
<br>
- Edit `ecosystem.config.js`
- Install pm2 locally<br>
`npm install -g pm2`
- run<br>
`pm2 deploy ecosystem.config.js production`
