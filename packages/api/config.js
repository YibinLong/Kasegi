const firebase = require('./certs/firebase.json');

module.exports = {
  mongodb: {
    url: 'mongodb+srv://root:rn07Lz0aD1JGHFpJ@cluster0.w8t5j.mongodb.net/kasegi?retryWrites=true&w=majority',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  cockroach: {
    user: 'christopher',
    host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    port: 26257,
    database: 'silky-pig-798.bank',
    password: 'Izh02Wl3BZngRohn',
    ssl: {
      // cert: fs.readFileSync('certs/cc-ca.crt').toString(),
    },
  },
};
