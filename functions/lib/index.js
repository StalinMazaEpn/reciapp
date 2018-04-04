// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.onAddRecycler = functions.database.
    ref('recycler/{recyclerId}').onCreate((event) => {
    //console.log('data',event.data.val());
    //console.log('recyclerId',event.params.recyclerId);
    const uid = event.data.val().idUser;
    return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot) => {
        const userPoints = userSnapshot.val().points;
        admin.database().ref(`user/${uid}/points`).set(userPoints + 100);
        console.log('Actualizando puntos', userPoints);
    });
});
//# sourceMappingURL=index.js.map