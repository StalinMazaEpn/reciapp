import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { LoginPage } from "../login/login";
import { RecyclerFormPage } from "../recycler-form/recycler-form";
import { ReciappService } from "../../services/reciapp.service";
import { AuthenticationService } from "../../services/authenticationService";
import { storage, database } from "firebase";
import { Camera, CameraOptions } from "@ionic-native/camera";


@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {
  isAuthenticated:boolean=false;
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
  tmp_selRecycler:any;
  error:boolean;

  userDelivery:any={
    delivery:{
      plastico:undefined,
      papel:undefined,
      chatarra:undefined,
      vidrio:undefined,
      compuesto:undefined
    }
  };

  tmpDate;
  date;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticationService:AuthenticationService,
  	private camera: Camera, public userSrv:ReciappService,public toastCtrl:ToastController) {
    this.error=false;
  	this.tmpPhoto="assets/imgs/suggestion.png";
    if (this.isAuthenticated==null || this.isAuthenticated==undefined || this.isAuthenticated==false) {
      this.isAuthenticated=this.authenticationService.isAuthenticated();
      console.log('SESSION ',this.isAuthenticated);  
    }else{
      console.log('SESSION',this.isAuthenticated);  
    }
    
  	if(this.authenticationService.getCurrentUser()!=null){
  		this.isAuthenticated=this.authenticationService.isAuthenticated();
  		this.uid=this.authenticationService.getCurrentUser().uid;
  		this.recyclers = this.userSrv.getFavoritiesRecycler(this.uid)
          .map((recyclerId)=>{
            return recyclerId.map(recyclerObj => {
              return this.userSrv.getRecyclerById(recyclerObj.payload.key);
            })
          })
  	}
    this.tmpDate =new Date();
    this.date=this.tmpDate.getFullYear()+""+this.tmpDate.getMonth()+""+this.tmpDate.getDay()+""+this.tmpDate.getHours()+""+this.tmpDate.getMinutes()+""+this.tmpDate.getSeconds()+""+this.tmpDate.getMilliseconds();
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
            //console.log(this.tmpPhoto);
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
    this.tmpDate=new Date()
    this.date=this.tmpDate.getFullYear()+""+this.tmpDate.getMonth()+""+this.tmpDate.getDay()+""+this.tmpDate.getHours()+""+this.tmpDate.getMinutes()+""+this.tmpDate.getSeconds()+""+this.tmpDate.getMilliseconds();

    //Validate data 
    if (this.recyclerId!=null && (this.plasticoCtrl!=null && this.plasticoCtrl!=undefined && this.plasticoCtrl!=0 ||
     this.papelCtrl!=null && this.papelCtrl!=undefined && this.papelCtrl!=0 || this.vidrioCtrl!=null && this.vidrioCtrl!=undefined && this.vidrioCtrl!=0 ||
     this.compuestoCtrl!=null && this.compuestoCtrl!=undefined && this.compuestoCtrl!=0 || this.chatarraCtrl!=null && this.chatarraCtrl!=undefined && this.chatarraCtrl!=0)) {
      //When user select a recycler
      this.userDelivery.idUser=this.uid;
      this.userDelivery.idRecycler=this.recyclerId;
      //this.userDelivery.date= database['ServerValue']['TIMESTAMP'];
      this.userDelivery.date=database.ServerValue.TIMESTAMP;
      this.rangeData();
      //Storage photo
      if (this.tmpPhoto !== undefined) {
        //Storage on firebase
        const pictures =storage().ref('deliveries/' + this.userDelivery.idUser +'/'+ this.date + '.jpeg');
        pictures.putString(this.tmpPhoto, 'data_url')
          .then((snapshot) => {
            // Upload completed successfully, now we can get the download URL
            this.userDelivery.image = snapshot.downloadURL;
            //function to save on firebase
            this.userSrv.addNewDelivery(this.userDelivery)
            .then(()=>{
              console.log('ok');
              document.getElementById(this.recyclerId).style.border="0";
              this.cleanForm();
              this.addDeliveryPoints();
            })
            .catch((e)=>{
              console.log('Hubo un error',e);
            });
          })
          .catch((error) => {
            //this.buttonDisabled = false;
            console.log("NOT UPLOADED", error);
          });
      } else {
        console.log("REGISTER NO PHOTO");
        this.error=true;
      }
    }else if(this.recyclerId==null && this.tmp_selRecycler==="Anónimo" && (this.plasticoCtrl!=null && this.plasticoCtrl!=undefined && this.plasticoCtrl!=0 ||
     this.papelCtrl!=null && this.papelCtrl!=undefined && this.papelCtrl!=0 || this.vidrioCtrl!=null && this.vidrioCtrl!=undefined && this.vidrioCtrl!=0 ||
     this.compuestoCtrl!=null && this.compuestoCtrl!=undefined && this.compuestoCtrl!=0 || this.chatarraCtrl!=null && this.chatarraCtrl!=undefined && this.chatarraCtrl!=0)){
      //When user not select a recycler
      this.userDelivery.idUser=this.uid;
      this.userDelivery.idRecycler=null;
      //this.userDelivery.date= database['ServerValue']['TIMESTAMP'];
      this.userDelivery.date=database.ServerValue.TIMESTAMP;
      this.rangeData();
      //Storage photo
      if (this.tmpPhoto !== undefined) {
        //Storage on firebase
        const pictures =storage().ref('deliveries/' + this.userDelivery.idUser +'/'+ this.date + '.jpeg');
        pictures.putString(this.tmpPhoto, 'data_url')
          .then((snapshot) => {
            // Upload completed successfully, now we can get the download URL
            this.userDelivery.image = snapshot.downloadURL;
            //function to save on firebase
            this.userSrv.addNewDelivery(this.userDelivery)
            .then(()=>{
              console.log('ok',this.userDelivery);
              document.getElementById('anonymousRecycler').style.border="0";
              this.cleanForm();
              this.addDeliveryPoints();
            })
            .catch((e)=>{
              console.log('Hubo un error Anónimo',e);
            });
          })
          .catch((error) => {
            //this.buttonDisabled = false;
            console.log("NOT UPLOADED", error);
          });

      } else {
        console.log("REGISTER NO PHOTO");
      }
    }else{
      console.log('falta llenar campos');
      this.error=true;
    }
  }

  cleanForm(){
    document.getElementById('anonymousRecycler').style.border="0";
    this.userDelivery.idRecycler=null;
    this.recyclerId=null;
    this.plasticoCtrl=null;
    this.papelCtrl=null;
    this.vidrioCtrl=null;
    this.compuestoCtrl=null;
    this.chatarraCtrl=null;
    this.uid=this.authenticationService.getCurrentUser().uid;
    this.error=false;
    this.tmpPhoto="assets/imgs/suggestion.png";
    console.log(this.date);
  }

  //Function to assign 
  rangeData(){
    if (this.plasticoCtrl!=null && this.plasticoCtrl!=undefined) {
        this.userDelivery.delivery.plastico=this.plasticoCtrl;
      }else{
        this.userDelivery.delivery.plastico=null;
      }

      if (this.papelCtrl!=null && this.papelCtrl!=undefined) {
        this.userDelivery.delivery.papel=this.papelCtrl;
      }else{
        this.userDelivery.delivery.papel=null;
      }

      if (this.vidrioCtrl!=null && this.vidrioCtrl!=undefined) {
        this.userDelivery.delivery.vidrio=this.vidrioCtrl;
      }else{
        this.userDelivery.delivery.vidrio=null;
      }

      if (this.compuestoCtrl!=null && this.compuestoCtrl!=undefined) {
        this.userDelivery.delivery.compuesto=this.compuestoCtrl;
      }else{
        this.userDelivery.delivery.compuesto=null;
      }

      if (this.chatarraCtrl!=null && this.chatarraCtrl!=undefined) {
        this.userDelivery.delivery.chatarra=this.chatarraCtrl;
      }else{
        this.userDelivery.delivery.chatarra=null;
      }
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
      this.tmp_selRecycler="Anónimo";
  		//console.log("Anónimo",recyclerId);
  		this.selRecycler="1px solid green";
  		//console.log(this.selRecycler);
  		document.getElementById('anonymousRecycler').style.border=this.selRecycler;
  		if (this.recyclerId!=null) {
	  		document.getElementById(this.recyclerId).style.border="0";
	  		this.recyclerId=null;
	  	}
  	}else{
      this.tmp_selRecycler=null;
  		document.getElementById('anonymousRecycler').style.border="0";
  		this.recyclerId=recyclerId;
  		this.selRecycler="1px solid green";
  		//console.log(this.selRecycler);
  		document.getElementById(recyclerId).style.border=this.selRecycler;
  	}
  	
  }

  addDeliveryPoints() {
    let toast = this.toastCtrl.create({
      message: 'Haz ganado 60 puntos, por realizar una entrega.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }
}
