import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ReciappService{

	favorities:any=[];

	constructor(public afdatabase: AngularFireDatabase, public afAuth:AngularFireAuth) {}

	public getCategory(){
		return this.afdatabase.list('/category').valueChanges();
	}

	public getCategoryById(id){
		return this.afdatabase.object('/category/'+id).valueChanges();
	}

	public getRecycler(){
		return this.afdatabase.list('/recycler').valueChanges();
	}

	public getRecyclerById(id){
		return this.afdatabase.object('/recycler/'+id).valueChanges();
	}

	public getSubcategory(id){
		return this.afdatabase.list('/subcategory', ref => ref.orderByChild('category').equalTo(id))
	}

	public getUser(uid){
		return this.afdatabase.object('/user/'+uid).valueChanges();
	}

	public getPartner(){
		return this.afdatabase.list('/partner').valueChanges();
	}

  public getExchangeList(){
    return this.afdatabase.list('/partner').snapshotChanges();
  }

  public getActiveCouponsByUser(uid){
    return this.afdatabase.list('/exchange', ref => ref.orderByChild('uid').equalTo(uid)).valueChanges();
  }

	public async createUser(uid,user) {
	    return await this.afdatabase.object('/user/'+uid).set(user);
	}

	public login(userData){
		return this.afAuth.auth.signInWithEmailAndPassword(userData.mail,userData.password);
	}

  public putLoveRecicler( id, iduser ) {
    this.favorities = [];

    return this.afdatabase.object( '/recycler/' + id + '/favoriteUsers/' + iduser ).set( true )
      .then( () => {

        return this.afdatabase.object( '/user/' + iduser + '/favoritiesReciclers/' + id ).set( true );

      } );
  }

  public checkPointsFirstFavorite(iduser) {
    return this.afdatabase.object( `/user/${iduser}/points/pointsFavorite` ).valueChanges()
  }

  public assignPointsFirstFavorite (iduser) {
    return this.afdatabase.object( `/user/${iduser}/points/pointsFavorite` ).set( 50 );
  }

	public removeLoveRecicler(id,iduser){
		this.favorities = [];
		this.afdatabase.object('/user/'+iduser+'/favoritiesReciclers/'+id).remove();
		return this.afdatabase.object('/recycler/'+id+'/favoriteUsers/'+iduser).remove();
	}

	public getFavoritiesRecycler(uid):any{
		return this.afdatabase.list(`/user/${uid}/favoritiesReciclers`).snapshotChanges(['child_added', 'child_removed'])
	}
	/*public registerUser(user:User){
		this.afAuth.auth.signInAnonymously().then(()=>{
	      this.afdatabase.object('user/'+user.mail.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')).set(user);
	      return this.afAuth.auth.createUserWithEmailAndPassword(user.mail,user.password);
	    });
	}*/

	public async addNewRecycler(id,recyclerData){
		//console.log(recyclerData);
		await this.afdatabase.object('/recycler/'+id).set(recyclerData);
	}

	public getReciclerKey(){
		return this.afdatabase.database.ref().child('recycler').push().key;
	}

	/*Function to add a new delivery*/
	public async addNewDelivery(deliveryData){
		//console.log(deliveryData);
		await this.afdatabase.list('/deliveries').push(deliveryData);
	}

	/*Function to exchange */
	public async exchangePoints(data){
		//console.log(deliveryData);
		await this.afdatabase.list('/exchange').push(data);
	}

	/**/
	public async porcentMaterial(){
		//console.log(deliveryData);
		return await this.afdatabase.list('/deliveries').valueChanges();
	}

}
