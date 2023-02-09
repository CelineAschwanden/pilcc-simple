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
      key  : './github_action_key',
      user : 'cili',
      host : '178.128.245.25',
      port : '33621',
      ref  : 'origin/master',
      repo : 'git@github.com:CelineAschwanden/pilcc.git',
      path : '/var/www/Pilcc',
      'post-deploy' : 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
