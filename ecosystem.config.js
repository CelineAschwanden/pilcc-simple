module.exports = {
  apps : [{
    name: "Pilcc",
    script: './index.js',
    env_production: {
      "PORT": 3000
    }
  }],

  deploy : {
    production : {
      key  : '../../.ssh/id_rsa',
      user : 'root',
      host : '178.128.245.25',
      ref  : 'origin/master',
      repo : 'git@github.com:CelineAschwanden/pilcc.git',
      path : '/var/www/Pilcc/current',
      'post-setup': 'yarn install',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production'
    }
  }
};
