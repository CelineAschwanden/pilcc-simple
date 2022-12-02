module.exports = {
  apps : [{
    name: "Pilcc",
    script: './index.js',
  }],

  deploy : {
    production : {
      key  : '../../.ssh/id_rsa.pub',
      user : 'root',
      host : '178.128.245.25',
      ref  : 'origin/master',
      repo : 'git@github.com:CelineAschwanden/pilcc.git',
      path : '/root/pilcc',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
