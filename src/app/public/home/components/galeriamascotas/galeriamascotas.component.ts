import { Component, OnInit } from '@angular/core';
import {Galeria} from 'src/app/core/models/galeria'
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-galeriamascotas',
  templateUrl: './galeriamascotas.component.html',
  styleUrls: ['./galeriamascotas.component.scss']
})
export class GaleriamascotasComponent implements OnInit {

  listOfImages: any;
  loading: boolean;

	responsiveOptions;
  constructor(
    private storage: Storage,
  ) {
		this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
	}

	ngOnInit() {
    this.loading = true;
    this.getImages();
    /*this.mascotas = [
      {
        name:'imagen0',
        image: 'collaget2.jpg'
      },
      {
        name: 'imagen1',
        image: 'collaget3.jpg'
      },
      {
        name: 'imagen2',
        image: 'collaget4.jpg'
      },
      /!*{
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
      }*!/

    ];*/
  }

  getImages() {
    const imagesRef = ref(this.storage, "carousel");
    listAll(imagesRef).then(
      async res => {
        this.listOfImages = [];
        for (let item of res.items) {
          const urlImage = await getDownloadURL(item);
          console.log(urlImage);
          this.listOfImages.push({
            url: urlImage,
            name: item.name
          });
        }
        this.loading = false;
      }).catch(error => console.log(error))
  }

}
