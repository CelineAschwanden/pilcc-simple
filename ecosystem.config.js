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
      key  : '../../.ssh/id_ed25519',
      user : 'cili',
      host : '174.138.103.190',
      ref  : 'origin/master',
      repo : 'git@github.com:CelineAschwanden/pilcc-simple.git',
      path : '/var/www/Pilcc',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
