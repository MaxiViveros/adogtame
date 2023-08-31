import {Component, Input, OnInit} from '@angular/core';
import {MascotasService} from "../../../../core/services/mascotas.service";
import {EventosService} from "../../../../core/services/eventos.service";

export interface Image {
  id?:string;
  name?:string;
  description?:string;
  url?:string;
}

@Component({
  selector: 'app-carousel-mascotas',
  templateUrl: './carousel-mascotas.component.html',
  styleUrls: ['./carousel-mascotas.component.scss']
})
export class CarouselMascotasComponent implements OnInit {
  responsiveOptions;
  images: Image[] = [];
  @Input() imagesList: Image[];
  @Input() petSelected: any;
  @Input() articleSelected: any;
  @Input() folderName: any;
  @Input() eventSelected: any;
  displayDeleteImage: boolean = false;
  imageSelectedToDelete: any;

  constructor(
    private mascotasService: MascotasService,
    private eventosService: EventosService
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

  ngOnInit(): void {
    console.log(this.imagesList);
  }

  displayDelete(image: Image) {
    this.imageSelectedToDelete = image;
    this.displayDeleteImage = true;
  }

  deleteImage() {
    if (this.folderName === 'mascotas_adopcion') {
      this.mascotasService.deleteImage(this.petSelected, this.imageSelectedToDelete, this.folderName);
      this.imagesList = this.imagesList.filter((element) => element.name != this.imageSelectedToDelete.name);
      this.displayDeleteImage = false;
    }
    if (this.folderName === 'mascotas_perdidas') {
      this.mascotasService.deleteImage(this.petSelected, this.imageSelectedToDelete, this.folderName);
      this.imagesList = this.imagesList.filter((element) => element.name != this.imageSelectedToDelete.name);
      this.displayDeleteImage = false;
    }
    if (this.folderName === 'eventos') {
      this.eventosService.deleteImage(this.eventSelected, this.imageSelectedToDelete, this.folderName);
      this.imagesList = this.imagesList.filter((element) => element.name != this.imageSelectedToDelete.name);
      this.displayDeleteImage = false;
    }
    if (this.folderName === 'articulos') {
      this.mascotasService.deleteImageArticle(this.articleSelected, this.imageSelectedToDelete, this.folderName);
      this.imagesList = this.imagesList.filter((element) => element.name != this.imageSelectedToDelete.name);
      this.displayDeleteImage = false;
    }
    if (this.folderName === 'carousel') {
      console.log(this.imageSelectedToDelete);
      this.mascotasService.deleteImageCarousel(this.imageSelectedToDelete, this.folderName);
      this.imagesList = this.imagesList.filter((element) => element.name != this.imageSelectedToDelete.name);
      this.displayDeleteImage = false;
    }

  }

}
