import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class AuthenticationService {

  public isAuth;
  public userData;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(
      data => {
        console.log("USER DATA", data);
        localStorage.setItem("userData", JSON.stringify(data));// TODO cambiar a NativeStorage
      });
  }

  public isAuthenticated() {
    const isAuth = JSON.parse(localStorage.getItem("userData"));// TODO cambiar a NativeStorage
    return !!isAuth;
  }

  public getCurrentUser() {
    return JSON.parse(localStorage.getItem("userData"));// TODO cambiar a NativeStorage
  }

}
