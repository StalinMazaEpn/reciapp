/** Add cloud functions in a project**/
/**
**
1. npm install -g firebase-tools
2. firebase login
3. firebase init functions
4. firebase list
5. firebase use --add app-id --> "reciveci-app"
6. firebase deploy --only functions
**
**/
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
/*
*
* Cloud Function Versión 0.9.x
*
*/
//admin.initializeApp(functions.config().firebase);
//Function to update points when user registered a new recycler
/*exports.onAddRecycler = functions.database.
ref('recycler/{recyclerId}').onCreate((event)=>{
    //Get user id to object
    const uid=event.data.val().idUser;
    //Use admin to exec specific function at admin into firebase
    return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot)=>{
        //Get points data
        const userPoints=userSnapshot.val().pointsTotal.pointsRegister;
        //Sum 100 points and update
        //admin.database().ref(`user/${uid}/points`).set(userPoints+100);
        admin.database().ref(`user/${uid}/pointsTotal/pointsRegister`).set(userPoints+100);
    });
})

//Function to update points when user delivery material
exports.onDeliveryMaterial = functions.database.
ref('deliveries/{deliveryId}').onCreate((event)=>{
    //Get user id to object
    const uid=event.data.val().idUser;
    const dateDelivery= event.data.val().date;
    //const rid=event.data.val().idRecycler;
    //Use admin to exec specific function at admin into firebase
    return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot)=>{
        console.log(event);
        //Get points data
        const userPoints=userSnapshot.val().pointsTotal.pointsRegister;
        const totalDeliveries=userSnapshot.val().totalDeliveries;
        //Sum 60 points and update
        admin.database().ref(`user/${uid}/pointsTotal/pointsRegister`).set(userPoints+60);
        //Update date to last delivery
        admin.database().ref(`user/${uid}/lastDelivery`).set(dateDelivery);
        //Update user total deliveries
        admin.database().ref(`user/${uid}/totalDeliveries`).set(totalDeliveries+1);
    });
})
*/
/*
*
* Cloud Function Versión 1.0.0
*
*/
admin.initializeApp();
//Function to update points when user registered a ner recycler
exports.onAddRecycler = functions.database.ref('recycler/{recyclerId}').onCreate((snap, context) => {
    //Get user id to object
    const uid = snap.val().idUser;
    //Use admin to exec specific function at admin into firebase
    return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot) => {
        //Get points data
        const userPoints = userSnapshot.val().pointsTotal.pointsRecycler;
        //Sum 100 points and update
        //admin.database().ref(`user/${uid}/points`).set(userPoints+100);
        admin.database().ref(`user/${uid}/pointsTotal/pointsRecycler`).set(userPoints + 100);
    });
});
//Function to update points when user delivery material
exports.onDeliveryMaterial = functions.database.ref('deliveries/{deliveryId}').onCreate((snap, context) => {
    //Get user id to object
    const uid = snap.val().idUser;
    const dateDelivery = snap.val().date;
    const rid = snap.val().idRecycler;
    //Use admin to exec specific function at admin into firebase
    return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot) => {
        //Get points data
        const userPoints = userSnapshot.val().pointsTotal.pointsDelivery;
        const totalDeliveries = userSnapshot.val().totalDeliveries;
        //Sum 60 points and update
        admin.database().ref(`user/${uid}/pointsTotal/pointsDelivery`).set(userPoints + 60);
        //Update date to last delivery
        admin.database().ref(`user/${uid}/lastDelivery`).set(dateDelivery);
        //Update user total deliveries
        admin.database().ref(`user/${uid}/totalDeliveries`).set(totalDeliveries + 1);
        //Reference to recycler
        admin.database().ref(`recycler/${rid}`).once(`value`).then((recyclerSnapshot) => {
            const totalReceives = recyclerSnapshot.val().totalReceives;
            admin.database().ref(`recycler/${rid}/totalReceives`).set(totalReceives + 1);
        });
    });
});
//# sourceMappingURL=index.js.map