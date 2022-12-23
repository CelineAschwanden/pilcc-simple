# pilcc

<b>A simple online-clipboard using Appwrite as database.</b><br><br>

Made with Node.js Express, Tailwind CSS<br>
and uses PM2 for easy deployment and process management on a server.
(Might rework to use React and Next.js for pre-rendering instead of ejs)<br><br>

## Deployment with PM2

[Server setup guide here](https://notes.ciliscu.com/40683/setup-easy-node-js-app-deployment-with-pm2-on-a-caddy-server-ubuntu)

Without GitHub Actions:
- Change the key path in `ecosystem.config.js` to point to your private SSH key for connecting to the server.
- Install pm2 locally<br>
`npm install -g pm2`
- run<br>
`pm2 deploy ecosystem.config.js production`
