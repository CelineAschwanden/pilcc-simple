module.exports = {
  apps : [{
    name: "Pilcc",
    script: './index.js',
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '178.128.245.25',
      ref  : 'origin/master',
      repo : 'git@github.com:CelineAschwanden/pilcc.git',
      path : '/pilcc',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
