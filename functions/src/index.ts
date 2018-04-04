
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
admin.initializeApp(functions.config().firebase);

//Function to update points when user registered a ner recycler
exports.onAddRecycler = functions.database.
ref('recycler/{recyclerId}').onCreate((event)=>{
	//Get user id to object
	const uid=event.data.val().idUser;
	//Use admin to exec specific function at admin into firebase
	return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot)=>{
		//Get points data
		const userPoints=userSnapshot.val().points;
		//Sum 100 points and update
		admin.database().ref(`user/${uid}/points`).set(userPoints+100);	
	});
})

