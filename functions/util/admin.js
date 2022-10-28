const admin = require("firebase-admin");

var serviceAccount = require("./accueba-db-firebase-adminsdk-iv5o4-d7588ec103.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {
  admin,
  db,
};
