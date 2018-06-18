import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReciappService } from '../../services/reciapp.service';

import { DashboardPage } from '../dashboard/dashboard';
import { SubcategoryPage } from '../subcategory/subcategory';

@IonicPage()
@Component( {
  selector: 'page-category',
  templateUrl: 'category.html'
} )
export class CategoryPage {

  categories : any;

  constructor( public navCtrl : NavController, public navParams : NavParams, public categoriesSrv : ReciappService ) {

    // categoriesSrv.getCategory()
    //   .subscribe( ( categories ) => {
    //     this.categories = categories;
    //     console.log( JSON.stringify( this.categories ) );
    //   } );

    //  Mejor ponerlo localmente para evitar demora en carga de información ya que son varias imágenes.
    this.categories = [
      {
        id: 1,
        name: 'Cartón',
        class: 'carton',
        image: 'assets/imgs/material/carton.png',
        // 'tip': 'Tip para reciclar plástico.',
        subcategories: [
          {
            image: 'assets/imgs/material/carton_sub1.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Corrugado'
              },
              {
                recyclable: true,
                text: 'Cartón prensado rígido'
              },
              {
                recyclable: true,
                text: 'Cartulinas de cajas de embalajes'
              },
              {
                recyclable: true,
                text: 'Craft con o sin impresión'
              },
              {
                recyclable: true,
                text: 'Cilindros de papel absorbente'
              },
              {
                recyclable: false,
                text: 'Cartón plastificado o encerado: desechables'
              },
              {
                recyclable: false,
                text: 'Cartón con residuos orgánicos. Ejm: caja de pizza'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Papel',
        class: 'papel',
        image: 'assets/imgs/material/papel.png',
        // 'tip': 'Tip para reciclar plástico.',
        subcategories: [
          {
            image: 'assets/imgs/material/papel_sub1.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Craft con o sin impresión, color café, papel ecológico'
              },
              {
                recyclable: true,
                text: 'Bond blanco mate: facturas, cuadernos, libros'
              },
              {
                recyclable: true,
                text: 'Papel periódico'
              },
              {
                recyclable: true,
                text: 'Papel couché brillante: revistas, volantes.'
              },
              {
                recyclable: false,
                text: 'Papel higiénico / servilletas'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Plástico',
        class: 'plastico',
        image: 'assets/imgs/material/plastico.png',
        // 'tip': 'Tip para reciclar plástico.',
        subcategories: [
          {
            image: 'assets/imgs/material/plastico_sub1.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Botellas desechables de bebidas, aguas, jugos'
              },
              {
                recyclable: true,
                text: 'Bandejas de tortas'
              },
              {
                recyclable: true,
                text: 'Cintas de audio y video'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub2.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Bolsas de basura'
              },
              {
                recyclable: true,
                text: 'Envases de detergente líquido'
              },
              {
                recyclable: true,
                text: 'Bidones'
              },
              {
                recyclable: true,
                text: 'Stretch film'
              },
              {
                recyclable: true,
                text: 'Termoencogibles'
              },
              {
                recyclable: true,
                text: 'Cajones para cerveza, frutas'
              },
              {
                recyclable: true,
                text: 'Películas para agro'
              },
              {
                recyclable: false,
                text: 'Envases de aceite o con residuos orgánicos.'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub3.jpg',
            detail: [
              {
                recyclable: false,
                text: 'Tuberías'
              },
              {
                recyclable: false,
                text: 'Lonas publicitarias'
              },
              {
                recyclable: false,
                text: 'Tarjetas de crédito y débito'
              },
              {
                recyclable: false,
                text: 'Muñecas plásticas'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub4.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Botellas de shampoo'
              },
              {
                recyclable: true,
                text: 'Detergente'
              },
              {
                recyclable: true,
                text: 'Termoencogibles'
              },
              {
                recyclable: true,
                text: 'Stretch film'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub5.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Vasos y tarrinas transparentes desechables'
              },
              {
                recyclable: true,
                text: 'Sillas plásticas'
              },
              {
                recyclable: true,
                text: 'Baldes'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub6.jpg',
            detail: [
              {
                recyclable: false,
                text: 'Espumaflex'
              },
              {
                recyclable: false,
                text: 'Cajas de cds'
              },
              {
                recyclable: false,
                text: 'Vasos desechables rígidos'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub7.jpg',
            detail: [
              {
                recyclable: false,
                text: 'Parece vidrio pero es maleable, se raya fácilmente, puede ser opaco, translúcido y de colores.'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub8.jpg',
            detail: [
              {
                recyclable: false,
                text: 'Reata'
              },
              {
                recyclable: false,
                text: 'Cuerdas de nylon'
              },
              {
                recyclable: false,
                text: 'Medias Nylon'
              }
            ]
          },
          {
            image: 'assets/imgs/material/plastico_sub9.jpg',
            detail: [
              {
                recyclable: false,
                text: 'Cubiertas transparentes para techo'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'Vidrio',
        class: 'vidrio',
        image: 'assets/imgs/material/vidrio.png',
        // 'tip': 'Tip para reciclar plástico.',
        subcategories: [
          {
            image: 'assets/imgs/material/vidrio_sub1.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Vidrio café / azul / verde/ transparente. Botellas y frascos.'
              },
              {
                recyclable: false,
                text: 'Fibra de vidrio: bañeras, sillas, tumbonas antiguas'
              },
              {
                recyclable: false,
                text: 'Focos y tubos fluorescentes'
              },
              {
                recyclable: false,
                text: 'Espejos'
              },
              {
                recyclable: false,
                text: 'Baldosa'
              },
              {
                recyclable: false,
                text: 'Vidrios de auto / parabrisas'
              }
            ],
            note: {
              title: '¡Precaución al desecharlos!',
              text: 'Informa a tu reciclador para que las maneje con cuidado y evitar accidentes.'
            }
          }
        ]
      },
      {
        id: 5,
        name: 'Metal',
        class: 'metal',
        image: 'assets/imgs/material/metal.png',
        // 'tip': 'Tip para reciclar plástico.',
        subcategories: [
          {
            image: 'assets/imgs/material/metal_sub1.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Aluminio: latas de bebidas, papel aluminio limpio, bandejas limpias, tapas metálicas de bebidas'
              },
              {
                recyclable: true,
                text: 'Hojalata: Latas de conserva'
              },
              {
                recyclable: false,
                text: 'Bolsas metalizadas de snacks'
              },
              {
                recyclable: false,
                text: 'Residuos electrónicos'
              },
              {
                recyclable: false,
                text: 'Electrodomésticos'
              }
            ]
          }
        ]
      },
      {
        id: 6,
        name: 'Tetra pak',
        class: 'tetrapak',
        image: 'assets/imgs/material/tetrapak.png',
        // 'tip': 'Tip para reciclar plástico.',
        subcategories: [
          {
            image: 'assets/imgs/material/tetrapak_sub1.jpg',
            detail: [
              {
                recyclable: true,
                text: 'Tetrapak: compuesto de plástico, metal y cartón. Limpio. Envases de jugo, leche, vino. Bolsas rígidas de leche'
              },
              {
                recyclable: false,
                text: 'Tetrapak con residuos orgánicos'
              }
            ]
          }
        ]
      },
      {
        id: 7,
        name: 'Otros residuos',
        class: 'otros',
        // 'tip': 'Tip para reciclar plástico.',
        subcategories: [
          {
            image: 'assets/imgs/material/otros_sub1.jpg',
            detail: [
              {
                recyclable: false,
                text: 'Restos de comida'
              },
              {
                recyclable: false,
                text: 'Ramas y hojas de jardinería. Pregunta a tu reciclador/a si tiene cerdos y necesita residuos orgánicos separados. Pregunta si hace compostaje o ¡aprende a hacerlo tú mismo!'
              },
              {
                recyclable: false,
                text: 'Baterías, lacas, pinturas, escombros, llantas. (Revisa los puntos de acopio municipales)'
              }
            ]
          }
        ]
      }
    ];
    //console.log(this.categories);
  }

  ionViewDidLoad() {
    console.log( 'ionViewDidLoad CategoryPage' );
  }

  Dashboard() : void {
    this.navCtrl.push( DashboardPage );
  }

  goSubcategory( categoryName, subcategories, categoryClass ) : void {
    //console.log(id);
    this.navCtrl.push( SubcategoryPage, { categoryName, subcategories, categoryClass } );
  }

}
