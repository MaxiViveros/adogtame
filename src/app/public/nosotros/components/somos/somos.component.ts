import { Component, OnInit } from '@angular/core';
import {PrimeIcons} from 'primeng/api';
import {CardModule} from 'primeng/card';
import {TimelineModule} from 'primeng/timeline';
@Component({
  selector: 'app-somos',
  templateUrl: './somos.component.html',
  styleUrls: ['./somos.component.scss']
})
export class SomosComponent implements OnInit {

  events1: any[];
  images: any[];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 4
    },
    {
        breakpoint: '900px',
        numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
  },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  constructor() { }
  //constructor(private photoService: PhotoService) { }



  ngOnInit(): void {
    //this.photoService.getImages().then(images => this.images = images)
    this.events1 = [
      {status: 'Inicios Adogtame', date: '2015', icon: PrimeIcons.STAR_FILL, color: '#d9376e',
      image: 'Firma.jpg',
      content: 'Creada en Curicó con distintos fundadores uno de los principales de ellos es la profesora karina Garate quien también era partícipe de la protectora de animales San Francisco de Curicó, conmovida con la casi nula responsabilidad de los propietarios sobre sus mascotas, dedicaba su tiempo libre al rescate de estos mismos. Ella tomó el cargo  de presidenta de la agrupación desde el inicio. '
      },
      {status: 'Nuevos miembros', date: '2018', icon: PrimeIcons.USER_PLUS, color: '#d9376e',
      image: 'Firma.jpg',
      content: 'En el año 2018 se une al grupo de esta organización la estudiante de medicina veterinaria, María José Castro Araya como secretaria y tesorera y alrededor de esta fecha ingresa la trabajadora social Evelin Vásquez Campos, quien actualmente es la presidenta'
      },
      {status: 'Personalidad Juridica', date: '2019', icon: PrimeIcons.BRIEFCASE, color: '#d9376e',
      image: 'Firma.jpg',
      content: 'El 5 de Septiembre del 2019 esta agrupación toma personalidad jurídica como Fundación, manteniendo su nombre original. Cada una de ellas, trabaja inspiradas por el apoyo hacia los caninos y felinos de la zona de Curicó, funcionando las 24 horas del día los 7 días de la semana.'
      },
      {status: 'Actualmente', date: ':)', icon: PrimeIcons.CHECK, color: '#d9376e',
      image: 'Firma.jpg',
      content: 'Hoy en día la fundación tiene como lema “Con tus acciones escribes mi destino: respetando mi vida o ignorando mi sufrimiento” y está conformada por una familia de mujeres que se dedican a velar por el bienestar de los animales domésticos que han perdido toda protección o que simplemente jamás la habían tenido hasta el momento de su rescate. No obstante, se han presentado casos en los que han debido asistir a otras especies más exóticas'
      }
  ];

    this.images = [
      {
          previewImageSrc: "/assets/Somos/Directorio.jpg",
          thumbnailImageSrc: "/assets/Somos/Directorio.jpg",
          alt: "Evelyn Vásquez Campos, María José Castro Araya y el colaborador veterinario Ricardo Muñoz. Cada uno de ellos, trabajan inspirados por el apoyo hacia los caninos y felinos de la zona de Curicó, funcionando las 24 horas del día los 7 días de la semana.",
          title: "Directiva de fundación Adogtame"
      },
      {
          previewImageSrc: "/assets/Somos/JornadaAdopcion.jpg",
          thumbnailImageSrc: "/assets/Somos/JornadaAdopcion.jpg",
          alt: "Jornadas de adopción realizadas los fines de semana en Mall Center, costado AIEP",
          title: "Jornadas de adopción"
      },
      {
          previewImageSrc: "/assets/Somos/SinHogar.jpg",
          thumbnailImageSrc: "/assets/Somos/SinHogar.jpg",
          alt: "Hogares temporales siempre son muy necesarios para cumplir con nuestra labor",
          title: "Busqueda de un hogar"
      },
      {
          previewImageSrc: "/assets/Somos/donacionesC.png",
          thumbnailImageSrc: "/assets/Somos/donacionesC.png",
          alt: "Las donaciones son parte fundamental para el funcionamiento de Adogtame",
          title: "Donaciones"
      }
  ]
  }

}
