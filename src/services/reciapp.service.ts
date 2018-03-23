import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ReciappService{

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

	public async createUser(uid,user) {
	    return await this.afdatabase.object('/user/'+uid).set(user);
	}

	public login(userData){
		return this.afAuth.auth.signInWithEmailAndPassword(userData.mail,userData.password);
	}
	/*public registerUser(user:User){
		this.afAuth.auth.signInAnonymously().then(()=>{
	      this.afdatabase.object('user/'+user.mail.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')).set(user);
	      return this.afAuth.auth.createUserWithEmailAndPassword(user.mail,user.password);
	    });
	}*/

	public addNewRecycler(id,recyclerData){
		//console.log(recyclerData);
		this.afdatabase.object('/recycler/'+id).set(recyclerData);
	}

	public getReciclerKey(){
		return this.afdatabase.database.ref().child('recycler').push().key;
	}
}