import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afdatabase: AngularFireDatabase) {
  }

  getRecicladores(): FirebaseListObservable<any[]> {
    return this.afdatabase.list('/recicladores');
  }

  addReciclador(name) {
    this.afdatabase.list('/recicladores').push(name);
  }

  removeReciclador(id) {
    this.afdatabase.list('/recicladores').remove(id);
  }
}
