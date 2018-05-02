import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from "../login/login";
import { RecyclerFormPage } from "../recycler-form/recycler-form";
import { ReciappService } from "../../services/reciapp.service";
import { AuthenticationService } from "../../services/authenticationService";
import { storage } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  isAuthenticated:boolean;
  uid:any;
  recyclers:any;
  tmpPhoto:any=null;

  recyclablePhoto:any=null;
  recyclerId:any;
  plasticoCtrl:any;
  papelCtrl:any;
  chatarraCtrl:any;
  vidrioCtrl:any;
  compuestoCtrl:any;

  selRecycler:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticationService:AuthenticationService,
  	private camera: Camera, public userSrv:ReciappService) {
  	this.tmpPhoto="assets/imgs/suggestion.png"
  	
  	if(this.authenticationService.getCurrentUser()!=null){
  		this.isAuthenticated=this.authenticationService.isAuthenticated();  		
  		this.uid=this.authenticationService.getCurrentUser().uid;
  		this.recyclers = this.userSrv.getFavoritiesRecycler(this.uid)
          .map((recyclerId)=>{
            return recyclerId.map(recyclerObj => {
              return this.userSrv.getRecyclerById(recyclerObj.payload.key);
            })
          })
          console.log("RECICLADORES", this.recyclers);
  	}
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPage');
  }

  takePhoto(){
    try{
      const options: CameraOptions = {
        quality: 100,
        targetHeight:600,
        targetWidth:600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true
      }
      this.recyclablePhoto=this.camera.getPicture(options)
          .then((resp)=>{
            this.tmpPhoto='data:image/jpeg;base64,' + resp;
            console.log(this.tmpPhoto);
          })
          .catch((e)=>{
            console.log(e);
            this.recyclablePhoto=null;
          });
    }
    catch(e){
      console.log(e);
      this.recyclablePhoto=null;
    }
  }

  delivery(){
  	console.log('Plastico',this.plasticoCtrl);
  	console.log('papel',this.papelCtrl);
  	console.log('chatarra',this.chatarraCtrl);
  	console.log('vidrio',this.vidrioCtrl);
  	console.log('compuesto',this.compuestoCtrl);
  	console.log('Reciclador',this.recyclerId);
  }

  goToLogin(){
  	this.navCtrl.push(LoginPage);
  }

  addRecycler(){
  	this.navCtrl.push(RecyclerFormPage);
  }

  selectRecycler(recyclerId){
  	if (this.recyclerId!=null) {
  		document.getElementById(this.recyclerId).style.border="0";
  	}
  	
  	if (recyclerId==="Anónimo") {
  		//console.log("Anónimo",recyclerId);
  		this.selRecycler="1px solid green";
  		//console.log(this.selRecycler);
  		document.getElementById('anonymousRecycler').style.border=this.selRecycler;
  		if (this.recyclerId!=null) {
	  		document.getElementById(this.recyclerId).style.border="0";
	  		this.recyclerId=null;
	  	}
  	}else{
  		document.getElementById('anonymousRecycler').style.border="0";
  		this.recyclerId=recyclerId;
  		this.selRecycler="1px solid green";
  		//console.log(this.selRecycler);
  		document.getElementById(recyclerId).style.border=this.selRecycler;
  	}
  	
  }
}
