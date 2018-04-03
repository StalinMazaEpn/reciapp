import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class AuthenticationService {

  public isAuth;
  public userData;

  constructor(public afAuth: AngularFireAuth,public nativeStorage:NativeStorage) {
    this.afAuth.authState.subscribe(
      data => {
        console.log("USER DATA", data);
        localStorage.setItem("userData", JSON.stringify(data));// TODO cambiar a NativeStorage
        /*this.nativeStorage.setItem('userData',JSON.stringify(data))
          .then(
            () => { console.log('info guardada'); return true},
            error => { return false}
          );*/
      });
  }

  public isAuthenticated() {
    const isAuth = JSON.parse(localStorage.getItem("userData"));// TODO cambiar a NativeStorage
      /*this.nativeStorage.getItem('userData')
          .then(
            () => { console.log('userData'); return true},
            error => { return false}
          );*/
    return !!isAuth;
  }

  public getCurrentUser() {
    return JSON.parse(localStorage.getItem("userData"));// TODO cambiar a NativeStorage
    /*this.nativeStorage.getItem('userData')
          .then(
            () => { return true},
            error => { return false}
          );*/
  }

}
