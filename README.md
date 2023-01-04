# pilcc

<b>A simple online-clipboard using Appwrite as database.</b><br><br>

Built with Node.js Express and simple pages styled with Tailwind CSS.<br>
Currently uses ejs to render one of the pages, might get replaced with next.js <br><br>

## Appwrite Functions

Node.js functions to be run by an Appwrite Backend Service<br>
- delete-expired-clips<br><br>

Deploy to Appwrite:<br>
- `npm install -g appwrite-cli`
- `appwrite login`
- `appwrite deploy function` <br><br>

## Deployment with PM2

[Server setup guide here](https://notes.ciliscu.com/40683/setup-easy-node-js-app-deployment-with-pm2-on-a-caddy-server-ubuntu)

If not using GitHub Actions:<br>
- Change the key path in `ecosystem.config.js` to point to your private SSH key for connecting to the server.
- Install pm2 locally<br>
`npm install -g pm2`
- run<br>
`pm2 deploy ecosystem.config.js production`
