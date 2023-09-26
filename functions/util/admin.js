const admin = require("firebase-admin");

const serviceAccount = require("./accueba-new-firebase-adminsdk-hs3hz-31515814b2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {
  admin,
  db,
};
