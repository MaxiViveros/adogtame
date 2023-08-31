import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Galeria} from 'src/app/core/models/galeria'

@Component({
  selector: 'app-servicioshome',
  templateUrl: './servicioshome.component.html',
  styleUrls: ['./servicioshome.component.scss']
})
export class ServicioshomeComponent implements OnInit {

  serviciosHome: Galeria [];
  responsiveOptions;
  constructor(private router: Router) { 
    this.responsiveOptions = [
      {
          breakpoint: '1920px',
          numVisible: 3,
          numScroll: 3
      },
      {
        breakpoint: '1900px',
        numVisible: 2,
        numScroll: 2
      },
      {
          breakpoint: '1400px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }

  ngOnInit(): void {
    this.serviciosHome = [
      {
        name:'imagen0',
        image: 'Image6.png'
      },
      {
        name: 'imagen1',
        image: 'Image886.png'
      },
      {
        name: 'imagen2',
        image: 'Image771.png'
      },
      /*{
        name: 'imagen3',
        image: 'c3.jpg'
      },
      {
        name: 'imagen3',
        image: 'c4.jpg'
      },
      {
        name: 'imagen3',
        image: 'c5.jpg'
      }*/

    ];
  }
  navegarHacia(direccion:any){
    this.router.navigate([direccion]);
  }
}
