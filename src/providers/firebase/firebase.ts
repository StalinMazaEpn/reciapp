import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afdatabase: AngularFireDatabase) {
  }

  getRecicladores() {
    return this.afdatabase.list('/recicladores');
  }

  addReciclador(name) {
    this.afdatabase.list('/recicladores').push(name);
  }

  removeReciclador(id) {
    this.afdatabase.list('/recicladores').remove(id);
  }
}
