import { Component, Input, Directive, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { ResizeEvent } from 'angular-resizable-element';

//@IonicPage()
@Component({
  selector: 'page-delivery-2',
  templateUrl: 'delivery-2.html',
})

@Directive({
  selector: '[mwlResizable]'
})

export class Delivery_2Page {

  public styles = [];

  @ViewChild('r1') r1: ElementRef;
  @ViewChild('r2') r2: ElementRef;
  @ViewChild('r3') r3: ElementRef;

  @Input()
  validateResize: (resizeEvent: ResizeEvent) => boolean;

  //dimensiones minimas
  MIN_DIMENSIONS_PX: number = 50;
  //alto por defecto
  ALTO_DEFECTO: number = 130;
  //sumaDivs
  SUMA_DIVS: number =  300;
  //arreglo posiciones
  posicionAnterior = [];
  //estilos validos arreglo
  estilosValidados = [];
  //arregloAlturasVerificar
  arregloAlturas = [];
  //numero de divs de la pantalla
  numeroDivs: number = 2;
  //objetos de los divs 
  divPosicionAnterior: Object = {
    top: 0,
    height: this.ALTO_DEFECTO,
    id: 0
  }; 
  // se guarda en un objeto el numero del evento y su valor de validacion
  divsValidos: Object = {
    numero: 0,
    valido: true
  }
  //valor del evento validacion
  validacion: boolean;
  //verificar si se aplicaran los estilos
  aplicarEstilos: boolean = true;
  //VARIABLE VERIFICAR DOS DIVS SE VALIDARON
  movValido = 0;
  //DIVS QUE SE VAN A VALIDAR
  divsActuales = [];
  // funcion validacion

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Delivery_2Page');
  }

   // funcion que crea un array con los objetos de los divs validados
  dividirValidaciones(comprobaciones) {
    this.arregloAlturas = this.posicionAnterior.filter(function (elemento) {
      return elemento.id == comprobaciones[0].numero || elemento.id == comprobaciones[1].numero;
    });
    console.log("OPERACION ALTURAS: ", this.arregloAlturas);   
  }
  //guardar la posicion de los divs actuales
  guardarPosicionA(evento, num) {
    for (let i = 0; i < this.numeroDivs; i++) {
      console.log();
      if (num === i) {
        //let idElemento = "r" + (num + 1);
        //let caja = document.getElementById(idElemento);
        this.divPosicionAnterior = {
          top: evento.rectangle.top,
          height: evento.rectangle.height,
          id: i
        }
      } else {
        let idElemento = "r" + (i + 1);
        let caja = document.getElementById(idElemento);
        this.divPosicionAnterior = {
          top: caja.offsetTop,
          height: caja.offsetHeight,
          id: i
        }
      }
      this.posicionAnterior[i] = this.divPosicionAnterior;
    }

  }
  //funcion para validar los eventos
  validate(event: ResizeEvent, num: number): boolean {
    //const r1H = document.getElementById('r1');
    //const r2H = document.getElementById('r2');
    //const r3H = document.getElementById('r3');
   
    if (event.rectangle.height &&
      event.rectangle.height < this.MIN_DIMENSIONS_PX) {
      //console.log('NOT VALID DIV: ', num);
      //cajasAjustables[num].innerHTML = "<p>TAMAÑO INVALIDO</p>";
      return false;
    } else {
       //cajasAjustables[num].innerHTML = "<p></p>";
       return true;
    }  

  }
  // funcion al terminar de reajustar el movimiento del evento
  onResizeEnd(event: ResizeEvent, num: number): void {
    console.log("INICIO VALIDACION DEL DIV: ", num);
    // evento inicio validacion  
    let height = event.rectangle.height;
    let top = event.rectangle.top;
    //console.log('ESTE ELEMENTO FUE REAJUSTADO', event);
    //validar el evento
    this.validacion = this.validate(event,num);
    //objetos con los valores del div y añado a un arreglo
    this.divsValidos = {
      numero: num,
      valido: this.validacion
    }
    this.divsActuales.push(this.divsValidos);

    //comprobar el numero de eventos
    if (this.movValido === 1) {
      console.log("Se validaron dos divs");
      //guardar estilos de los divs validados
      for (var i = 0; i < this.divsActuales.length; i++) {
        if (this.divsActuales[i].valido == false) {
          this.aplicarEstilos = false;
        }
      }
      this.guardarPosicionA(event, num);
      //aqui ya tengo objeto con divs posiciones
      this.dividirValidaciones(this.divsActuales);
      //CLAUSULA IF CUANDO ESTILOS SON INVALIDOS
      if (this.aplicarEstilos  == false) {
        //objetoPosiciones estilos nuevos
        this.estilosValidados = this.operacionAlturas(this.arregloAlturas);
        console.log("LLAMO A LA FUNCION ASINCRONA CON ESTOS VALORES: ", this.estilosValidados);
        this.dibujarEstilosValidos(this.estilosValidados);
      } 
      this.imprimirPorcentajes();  
      this.movValido = 0;
      this.divsActuales = [];
    } else {

      this.movValido = this.movValido + 1;
    }
    //APLICAR ESTILOS DEL EVENTO   
    this.estilosDiv(top, height, num);
    console.log("FIN VALIDACION DEL DIV: ", num);
  }

  imprimirPorcentajes() {
    for(let i = 1; i <= this.numeroDivs; i++){
      let nombre = `r${i}`;
      let elemento = document.getElementById(nombre);
      let tamanio = elemento.offsetHeight;
      let porcentaje = ((tamanio*100)/this.SUMA_DIVS).toFixed(2);
      console.log(`${nombre} y ${tamanio} y ${porcentaje}`);
      elemento.innerText = `${porcentaje} %`;
    }
  }


  //funcion estilos
  estilosDiv(top: any, alto: any, num: number) {
    this.styles[num] = {
      position: 'fixed',
      left: `${0}px`,
      top: `${top}px`,
      width: `${100}%`,
      height: `${alto}px`
    };
  }

  //funcion dibujar divs con los estilos validos
  dibujar1Segundo(objeto) {
  return new Promise(resolve => {
    setTimeout(() => {
      this.estilosDiv(objeto[0].top, objeto[0].height, objeto[0].id);
       this.estilosDiv(objeto[1].top, objeto[1].height, objeto[1].id);
      resolve('NUEVO ESTILO DIBUJADO');
    },
    1000);
  });
}

//funcion asincrona que espera 1 segundo y aplica los estilos validos
async dibujarEstilosValidos(objetoEstilos) {
  let result = await this.dibujar1Segundo(objetoEstilos);
  //console.log(`APLICARE ESTE TOP: ${objetoEstilos[0].top} CON ESTE ALTO: ${objetoEstilos[0].height} EN ESTE DIV: ${objetoEstilos[0].id}`);
  //console.log(`APLICARE ESTE TOP: ${objetoEstilos[1].top} CON ESTE ALTO: ${objetoEstilos[1].height} EN ESTE DIV: ${objetoEstilos[1].id}`);
  console.log(result);
}

//retornaID_NOVALIDO
retornarID(minimo,arreglo){
    if(minimo == arreglo[0].height){
        return 0;
       } else {
        return 1;
       }
}

//recorrer DIV Y CREAR NUEVO ARREGLO DE ALTURAS A VALIDAR
recorrerDivs(arreglo){
    let array = [];
      for (let i = 0; i < arreglo.length; i++) {
    array[i] = arreglo[i].height;
    }
    return array;
};

//CALCULAR ALTURAS CORRECTAS
operacionAlturas(arreglo){
  let estiloObj1 = {};
  let estiloObj2 = {};
  let resultado = [];
  let minAlturaValida = this.MIN_DIMENSIONS_PX;
  let arrayAltos = this.recorrerDivs(arreglo);
  let alturaMin = Math.min.apply(null,arrayAltos);
  //let alturaMax = Math.max.apply(null,arrayAltos);
  let diferenciaTam = minAlturaValida- alturaMin;
  let idArreglo = this.retornarID(alturaMin,arreglo);
  let mensajeInicial = `ARREGLO INICIAL 0->  TOP: ${arreglo[0].top} HEIGHT: 
  ${arreglo[0].height } Y ARREGLO INICIAL 1->  TOP: ${arreglo[1].top} HEIGHT: 
  ${arreglo[1].height }`;
  //inicio alert
  let basicAlert = this.alertCtrl.create({
    title: 'Mensaje',
    subTitle: mensajeInicial,
    buttons: ['OK']
  });
  basicAlert.present();
  //fin alert
  console.log("ARRAY INICIAL: " , arreglo);
  //console.log("ID RETIRADO", idArreglo);  
 
  if(idArreglo == 0){
    estiloObj1 = 
      {
      top: arreglo[0].top, 
      height: arreglo[0].height+diferenciaTam, 
      id: arreglo[0].id
      };
    estiloObj2 = 
      {
      top: arreglo[1].top+diferenciaTam, 
      height: arreglo[1].height-diferenciaTam, 
      id: arreglo[1].id
      };
  } else {
  estiloObj1 = 
    {
    top: arreglo[0].top, 
    height: arreglo[0].height-diferenciaTam, 
    id: arreglo[0].id
    };
  estiloObj2 = 
    {
    top: arreglo[1].top-diferenciaTam, 
    height: arreglo[1].height+diferenciaTam, 
    id: arreglo[1].id
    };
  }

  resultado.push(estiloObj1);
  resultado.push(estiloObj2);
  resultado.push(idArreglo);
  //console.log("ARRAY FINAL: " , resultado);
  return resultado;
}
  //imprimir

  

}
