const admin = require("firebase-admin");

const serviceAccount = require("./accueba-db-firebase-adminsdk-iv5o4-5d5717c76c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {
  admin,
  db,
};
