import { Injectable } from '@angular/core';

import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ReciappService{

	constructor(public afdatabase: AngularFireDatabase) {}

	public getCategorias(){
		return this.afdatabase.list('/categories').valueChanges();
	}

	public getCategoria(id){
		return this.afdatabase.object('/categories/'+id).valueChanges();
	}
	
	public getRecicladores(){
		return this.afdatabase.list('/recicladores').valueChanges();
	}

	public getRecicle(id){
		return this.afdatabase.object('/recicladores/'+id).valueChanges();
	}

	public getReciclables(id){
		console.log("CATEGORY ID",id);
		return this.afdatabase.list('/recyclable', ref => ref.orderByChild('categorie').equalTo(id))
	}

	public getUsuario(){
		return this.afdatabase.object('/Users/1').valueChanges();
	}
}
/*Usuario=[
		{id:1,
		 Nombres:'Marlon Ricardo',
		 Apellidos:'Cáceres Almeida',
		 img:'http://www.reciveci.ec/images/reciclar/categorias/plastico.png',
		 telefono:'0987654321',
		 correo:'a@a.com',
		 contrasena:'123'
		}
	];*/

/*Categorias=[
	{
		id:1,
		Nombre:'Plástico',
		img:'http://www.reciveci.ec/images/reciclar/categorias/plastico.png',
		tip:'Tip para reciclar plástico.'
	},{
		id:2, 
		Nombre:'Papel',
		img:'http://www.reciveci.ec/images/reciclar/categorias/papel.png',
		tip:'LA CLAVE PARA RECICLAR PAPEL Y CARTÓN ES QUE ESTÉN LIMPIOS Y SECOS.'
	},{
		id:3,
		Nombre:'Vidrio',
		img:'http://www.reciveci.ec/images/reciclar/categorias/vidrio.png',
		tip:'Tip para reciclar vidrio.'
	},{
		id:4,
		Nombre:'Compuesto', 
		img:'http://www.reciveci.ec/images/reciclar/categorias/compuesto.png',
		tip:'Tip para reciclar compuesto.'
	}
	];*/
	
	/*public getCategoria(id){
		return this.Categorias.filter(
			function(e,i){
				return e.id==id
			})[0] || {id:null, Nombre:null, img:null};
	}*/

	/*Recicladores=[
	{id:1, Nombre:'Elon Musk',
	 img:'https://fin.guru/uploads/contents/5a68c193ed930.jpg',
	  telefono:'0987654321', 
	  dias:'Lunes, Jueves y Viernes',
	  horario:'17:00 - 18:00'},
	{id:2, Nombre:'María Blanca Azucena', img:'https://www.connectas.org/wp-content/uploads/2017/08/foto-de-perfil.jpg', telefono:'0987654321', dias:'Martes y Jueves',horario:'15:00 - 17:00'}
	];*/
	/*public getReciclador(id){
		return this.Recicladores.filter(
			function(e,i){
				return e.id==id
			})[0] || {id:null, Nombre:null, img:null, telefono:null, dias:null,horario:null};
	}*/

	/*public getReciclador_count(){
		return this.Recicladores.length;
	}*/


	/*public getReciclables(id){
		return this.Reciclables.filter(function(e,i){
				return e.categoria==id
			}) || {id:null, descripcion:{ img:null, detalle:null},categoria:null};
	}*/
	/*Reciclables=[
		{
			id:1,
			descripcion:{
				img:'http://img.over-blog-kiwi.com/1/18/10/63/20150503/ob_d55ec4_hojas-de-papel.jpg',
				detalle:'Papel Bond:mate. Ejm: Cuadernos o libros.'
			},
			categoria:2
		},{
			id:2,
			descripcion:{
				img:'https://3.imimg.com/data3/IT/UU/MY-1905405/paper-industry-colours-500x500.jpg',
				detalle:'Papel couché como revistas, volantes.'
			},
			categoria:2
		},{
			id:3,
			descripcion:{
				img:'http://yalobox.com/1152-home_default/te-de-hierba-luisa-pusuqui-caja-25-sobres.jpg',
				detalle:'Cartulina con recubrimiento plástico, como cajas de té o cereales.'
			},
			categoria:2
		},{
			id:4,
			descripcion:{
				img:'https://http2.mlstatic.com/esquineros-de-carton-prensado-color-marron-D_NQ_NP_601711-MLA20615795578_032016-F.jpg',
				detalle:'Cartón prensado.'
			},
			categoria:2
		}

	];*/