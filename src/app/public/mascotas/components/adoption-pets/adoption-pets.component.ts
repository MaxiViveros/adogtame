import { Component, OnInit } from '@angular/core';
import {Animal} from "../../../../core/models/animal.model";
import {SelectItem} from "primeng/api";
import {MascotasService} from "../../../../core/services/mascotas.service";
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adoption-pets',
  templateUrl: './adoption-pets.component.html',
  styleUrls: ['./adoption-pets.component.scss']
})
export class AdoptionPetsComponent implements OnInit {

  responsiveOptions;
  nameFolderImages: any;
  displayCarousel: boolean = false;
  petSelected: any;
  listOfImages: any[];
  listOfImagesAux: any[];
  folderName = "mascotas_adopcion"
  showCasoExternoModal: boolean = false;

  //dataview
  listOfPets: Animal[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: any;

  constructor(
    private mascotasService: MascotasService,
    private storage: Storage,
    private router: Router
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
    this.getPetsAdoption();
  }
  /*

   */
  getPetsAdoption() {
    this.mascotasService.getPets().subscribe((res) => {
      this.listOfPets = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Animal)
        }
      })
      this.getImageAdoption('mascotas_adopcion');
      this.getAllImages();
    })
  }
  /*
  trae UNA sola imagen para las mascotas y las guarda en el atributo urlImage de Animal
   */
  getImageAdoption(nameFolderImage) {
    this.nameFolderImages = nameFolderImage
    this.listOfPets.forEach((pet) => {
      const imagesRef = ref(this.storage, this.nameFolderImages + `/${pet.nombre}` + `_` + `${pet.id}`);
      listAll(imagesRef).then(
        async res => {
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === pet.id) {
              pet.urlImage = await getDownloadURL(item)
              break;
            }
          }
        }).catch(error => console.log(error))
    })
  }
  /*

   */
  contactoPetSelected: any;
  routerToForm(petSelected) {
    if (petSelected.tipoCaso === 'externo') {
      this.contactoPetSelected = petSelected.contacto;
      this.showCasoExternoModal = true;
    }
    else {
      window.location.href = petSelected.linkCuestionario;
    }
  }
  /*

   */
  showCarouselModal(petSelected) {
    this.petSelected = petSelected;
    this.listOfImagesAux = this.listOfImages.filter(x => x.petAdoption.id === petSelected.id);
    this.displayCarousel = true;
  }
  /*

   */
  getAllImages() {
    this.listOfPets.forEach((pet) => {
      const imagesRef = ref(this.storage, this.folderName+`/${pet.nombre}`+`_`+`${pet.id}`);
      listAll(imagesRef).then(
        async res => {
          this.listOfImages = [];
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === pet.id) {
              const urlImage = await getDownloadURL(item);
              this.listOfImages.push({
                url: urlImage,
                name: item.name,
                petAdoption: pet
              });
            }
          }
        }).catch(error => console.log(error))
    })
  }
  /*

   */
  closeCarousel() {
    this.displayCarousel = false;
    this.listOfImagesAux = this.listOfImages;
  }

}
