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
  tmpRecycler:any;
  tmpRecyclerImage:any;
  tmpRecyclerName:any;
  tmpRecyclerFirstLetterName:any;  

  recyclablePhoto:any=null;
  recyclerId:any;
  plasticoCtrl:any;
  papelCtrl:any;
  chatarraCtrl:any;
  vidrioCtrl:any;
  compuestoCtrl:any;
  cartonCtrl:any;
  fundaCtrl:any;

  selRecycler:any;
  tmp_selRecycler:any;
  error:boolean;

  userDelivery:any={
    fundaCtrl:undefined,
    delivery:{
      plastico:undefined,
      papel:undefined,
      chatarra:undefined,
      vidrio:undefined,
      compuesto:undefined,
      carton:undefined,
    }
  };

  tmpDate;
  date;
  hideFavorites:boolean=false;
  totalMaterialRecyclable:number=0;
  errTotalMaterialRecyclable:boolean;
  errorSize:boolean;

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

    if (this.fundaCtrl!=null && this.fundaCtrl!=undefined && this.fundaCtrl!=0) {
      this.errorSize=false;
      //Validate data 
      if (this.recyclerId!=null && (this.plasticoCtrl!=null && this.plasticoCtrl!=undefined && this.plasticoCtrl!=0 ||
       this.papelCtrl!=null && this.papelCtrl!=undefined && this.papelCtrl!=0 || 
       this.vidrioCtrl!=null && this.vidrioCtrl!=undefined && this.vidrioCtrl!=0 ||
       this.compuestoCtrl!=null && this.compuestoCtrl!=undefined && this.compuestoCtrl!=0 || 
       this.chatarraCtrl!=null && this.chatarraCtrl!=undefined && this.chatarraCtrl!=0 || 
       this.cartonCtrl!=null && this.cartonCtrl!=undefined && this.cartonCtrl!=0)) {
        
        if (this._totalMaterialRecyclable>0 && this._totalMaterialRecyclable<=100) {
          //When user select a recycler
          this.userDelivery.idUser=this.uid;
          this.userDelivery.idRecycler=this.recyclerId;
          //Tomamos la hora del servidor (Arreglo)
          //this.userDelivery.date= database['ServerValue']['TIMESTAMP'];
          //Tomamos la hora del servidor (Métodos)
          this.userDelivery.date=database.ServerValue.TIMESTAMP;
          this.rangeData();      
          //console.log(this.tmpPhoto);
          //Storage photo
          if (this.tmpPhoto !== undefined && this.tmpPhoto != "assets/imgs/suggestion.png") {
            //Storage on firebase
            const pictures =storage().ref('deliveries/' + this.userDelivery.idUser +'/'+ this.date + '.jpeg');
            pictures.putString(this.tmpPhoto, 'data_url')
              .then((snapshot) => {
                // Upload completed successfully, now we can get the download URL
                this.userDelivery.image = snapshot.downloadURL;
                console.log('Entrega',this.userDelivery.idRecycler);
                //function to save on firebase
                this.userSrv.addNewDelivery(this.userDelivery)
                .then(()=>{
                  console.log('ok');
                  //document.getElementById(this.recyclerId).style.border="0";
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
                this.error=true;
              });
          } else {
            console.log("REGISTER NO PHOTO");
            this.error=true;
          }
        }else{
          this.errTotalMaterialRecyclable=true;
        }

      }else if(this.recyclerId==null && this.tmp_selRecycler==="Anónimo" && (this.plasticoCtrl!=null && this.plasticoCtrl!=undefined && this.plasticoCtrl!=0 ||
       this.papelCtrl!=null && this.papelCtrl!=undefined && this.papelCtrl!=0 || 
       this.vidrioCtrl!=null && this.vidrioCtrl!=undefined && this.vidrioCtrl!=0 ||
       this.compuestoCtrl!=null && this.compuestoCtrl!=undefined && this.compuestoCtrl!=0 || 
       this.chatarraCtrl!=null && this.chatarraCtrl!=undefined && this.chatarraCtrl!=0 || 
       this.cartonCtrl!=null && this.cartonCtrl!=undefined && this.cartonCtrl!=0)){
        
        if (this._totalMaterialRecyclable>0 && this._totalMaterialRecyclable<=100) {
          //When user not select a recycler
          this.userDelivery.idUser=this.uid;
          this.userDelivery.idRecycler=null;
          //this.userDelivery.date= database['ServerValue']['TIMESTAMP'];
          this.userDelivery.date=database.ServerValue.TIMESTAMP;
          this.rangeData();
          //Storage photo
          if (this.tmpPhoto !== undefined && this.tmpPhoto != "assets/imgs/suggestion.png") {
            //Storage on firebase
            const pictures =storage().ref('deliveries/' + this.userDelivery.idUser +'/'+ this.date + '.jpeg');
            pictures.putString(this.tmpPhoto, 'data_url')
              .then((snapshot) => {
                // Upload completed successfully, now we can get the download URL
                this.userDelivery.image = snapshot.downloadURL;
                //function to save on firebase
                this.userSrv.addNewDelivery(this.userDelivery)
                .then(()=>{
                  console.log('ok Anónimo',this.userDelivery);
                  //document.getElementById('anonymousRecycler').style.border="0";
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
            this.error=true;
          }
        }else{
          this.errTotalMaterialRecyclable=true;
        }

      }else{
        console.log('falta llenar campos');
        this.error=true;
      }
    }else{
      this.errorSize=true;
      console.log('error al escoger tamaño de la funda');
    }
   
   }

  cleanForm(){
    //document.getElementById('anonymousRecycler').style.border="0";
    this.userDelivery.idRecycler=null;
    this.userDelivery.fundaCtrl=null;
    this.recyclerId=null;
    this.plasticoCtrl=null;
    this.papelCtrl=null;
    this.vidrioCtrl=null;
    this.compuestoCtrl=null;
    this.chatarraCtrl=null;
    this.cartonCtrl=null;
    this.fundaCtrl=null;
    this.uid=this.authenticationService.getCurrentUser().uid;
    this.error=false;
    this.errorSize=false;
    this.errTotalMaterialRecyclable=false;
    this.tmpPhoto="assets/imgs/suggestion.png";
    this.recyclablePhoto=null;
    console.log(this.date);
  }

  //Function to assign 
  rangeData(){
    if (this.fundaCtrl!=null && this.fundaCtrl!=undefined) {
      this.userDelivery.fundaCtrl=this.fundaCtrl;
      console.log(this.fundaCtrl);
    }else{
      this.userDelivery.fundaCtrl=null;
      console.log(this.fundaCtrl);
    }

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

    if (this.cartonCtrl!=null && this.cartonCtrl!=undefined) {
      this.userDelivery.delivery.carton=this.cartonCtrl;
    }else{
      this.userDelivery.delivery.carton=null;
    }
  }

  goToLogin(){
  	this.navCtrl.push(LoginPage);
  }

  addRecycler(){
  	this.navCtrl.push(RecyclerFormPage);
  }

  selectRecycler(recyclerId){
    //hide section
    this.hideFavorites=true;

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
      //margin 
      this.tmp_selRecycler=null;
      document.getElementById('anonymousRecycler').style.border="0";
      this.recyclerId=recyclerId;
      this.selRecycler="1px solid green";
      //console.log(this.selRecycler);
      document.getElementById(recyclerId).style.border=this.selRecycler;
  	}
    
    //show only recycler
      //this.tmpRecycler=this.userSrv.getRecyclerById(recyclerId);
      
      this.userSrv.getRecyclerById(recyclerId).subscribe(data=>{
        this.tmpRecyclerImage=data.image;
        this.tmpRecyclerName=data.name;
        this.tmpRecyclerFirstLetterName=this.tmpRecyclerName.charAt(0).toUpperCase();
      });
  }

  addDeliveryPoints() {
    let toast = this.toastCtrl.create({
      message: 'Haz ganado 60 puntos, por realizar una entrega.' ,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  aux1=0;
  aux2=0;
  aux3=0;
  aux4=0;
  aux5=0;
  aux6=0;
  _totalMaterialRecyclable:number=0;
  //btnDisabled:boolean=false;

  totalMaterial(number,name){
    
    switch (name) {
      case "plastico":
        this.aux1=number;
        //console.log('plastico',this.aux1);
        break;
      
      case "papel":
        this.aux2=number;
        //console.log('papel',this.aux2);
        break;

      case "vidrio":
        this.aux3=number;
        //console.log('vidrio',this.aux3);
        break;

      case "compuesto":
        this.aux4=number;
        //console.log('compuesto',this.aux4);
        break;

      case "chatarra":
        this.aux5=number;
        //console.log('chatarra',this.aux5);
        break;

      case "carton":
        this.aux6=number;
        //console.log('chatarra',this.aux5);
        break;
    }
    if ((this.totalMaterialRecyclable=this.aux1+this.aux2+this.aux3+this.aux4+this.aux5+this.aux6)>=100){
      this._totalMaterialRecyclable=this.aux1+this.aux2+this.aux3+this.aux4+this.aux5+this.aux6;
      this.totalMaterialRecyclable=100;
      console.log('La funda ya esta llena');
      //this.btnDisabled=true;
    }else if ((this.aux1+this.aux2+this.aux3+this.aux4+this.aux5+this.aux6)>0 && (this.aux1+this.aux2+this.aux3+this.aux4+this.aux5+this.aux6)<=100) {
      this._totalMaterialRecyclable=this.aux1+this.aux2+this.aux3+this.aux4+this.aux5+this.aux6;
      this.totalMaterialRecyclable=this.aux1+this.aux2+this.aux3+this.aux4+this.aux5+this.aux6;
      //this.btnDisabled=false;
    }
  }

  showFavorites(){
    this.hideFavorites=false;
  }
}
