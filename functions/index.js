const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./y-a-firebase-daangn-firebase-adminsdk-4y53u-ac4266d255.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
exports.hello = functions
  .region("asia-northeast3")
  .https.onRequest((req, res) => {
    functions.logger.info("Hello", { structuredData: true }); // firebase console찍기
    res.send("hello from firebase!");
  });

const db = admin.firestore();

exports.createAlert = functions
  .region("asia-northeast3")
  .firestore.document("chatroom/{docid}")
  .onCreate((snapshot, context) => {
    const who = snapshot.data().who;

    db.collection("user").doc(who[0]).update({ alert: "어떤놈이 채팅검" });
    db.collection("user").doc(who[1]).update({ alert: "어떤놈이 채팅검" });
  });
