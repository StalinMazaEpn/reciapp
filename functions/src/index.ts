
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
exports.onAddRecycler = functions.database.ref('recycler/{recyclerId}').onCreate((snap,context)=>{
	//Get user id to object
	const uid=snap.val().idUser;
	//Use admin to exec specific function at admin into firebase
	return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot)=>{
		//Get points data
		const userPoints=userSnapshot.val().points.pointsRecycler;
		const userPointsTotal=userSnapshot.val().points.total;
		//Sum 100 points and update
		//admin.database().ref(`user/${uid}/points`).set(userPoints+100);
		admin.database().ref(`user/${uid}/points/pointsRecycler`).set(userPoints+100);
		admin.database().ref(`user/${uid}/points/total`).set(userPointsTotal+100);
	});
});

exports.onFirstFavorite = functions.database.ref( 'user/{userid}/points/pointsFavorite' )
  .onUpdate( ( change, context ) => {
    const uid = context.params.userid;
    const previousPointsFavorite = change.before.val();


    if( previousPointsFavorite === 0 ) {
      return admin.database().ref( `user/${uid}/points/total` ).once( 'value' ).then( ( userPointsSnapshot ) => {
        const userPointsTotal = userPointsSnapshot.val();

        return admin.database().ref( `user/${uid}/points/total` ).set( userPointsTotal + 50 );
      } );
    }
  } );



//Function to update points when user delivery material
exports.onDeliveryMaterial = functions.database.ref('deliveries/{deliveryId}').onCreate((snap,context)=>{
	//Get user id to object
	const uid=snap.val().idUser;
	const dateDelivery= snap.val().date;
	const rid=snap.val().idRecycler;
	//Use admin to exec specific function at admin into firebase
	return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot)=>{
		//Get points data
		const userPoints=userSnapshot.val().points.pointsDelivery;
		const userPointsTotal=userSnapshot.val().points.total;
		const totalDeliveries=userSnapshot.val().totalDeliveries;
		//Sum 60 points and update
		admin.database().ref(`user/${uid}/points/pointsDelivery`).set(userPoints+60);
		admin.database().ref(`user/${uid}/points/total`).set(userPointsTotal+60);
		//Update date to last delivery
		admin.database().ref(`user/${uid}/lastDelivery`).set(dateDelivery);
		//Update user total deliveries
		admin.database().ref(`user/${uid}/totalDeliveries`).set(totalDeliveries+1);
		//Reference to recycler
		admin.database().ref(`recycler/${rid}`).once(`value`).then((recyclerSnapshot)=>{
			const totalReceives=recyclerSnapshot.val().totalReceives;

			admin.database().ref(`recycler/${rid}/totalReceives`).set(totalReceives+1);
		});

	});
})

//Function to update points when user registered a ner recycler
exports.onExchange = functions.database.ref('exchange/{exchangeId}').onCreate((snap,context)=>{
	//Get user id to object
	const uid=snap.val().uid;
	const exchangePoints=snap.val().exchange.points;
	//Use admin to exec specific function at admin into firebase
	return admin.database().ref(`user/${uid}`).once('value').then((userSnapshot)=>{
		//Get points data
		const userPointsTotal=userSnapshot.val().points.total;
		admin.database().ref(`user/${uid}/points/total`).set(userPointsTotal - exchangePoints);
	});
})
