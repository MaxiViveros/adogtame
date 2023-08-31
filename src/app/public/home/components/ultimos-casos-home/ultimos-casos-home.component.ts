import { Component, Input, OnInit } from '@angular/core';
import { Animal } from 'src/app/core/models/animal.model';
import { MascotasService } from 'src/app/core/services/mascotas.service';
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {FirestorageService} from "../../../../core/services/firestorage.service";
import { ThisReceiver } from '@angular/compiler';
import { LazyLoadEvent } from 'primeng/api';

export interface Image {
  id?:string;
  name?:string;
  description?:string;
  url?:string;
  pet?: Animal;
  cuestionario?:String;
}


@Component({
  selector: 'app-ultimos-casos-home',
  templateUrl: './ultimos-casos-home.component.html',
  styleUrls: ['./ultimos-casos-home.component.scss']
})
export class UltimosCasosHomeComponent implements OnInit {
  listofPets: Animal[];
  filtrado: Animal[];
  listOfImages: Image[];
	responsiveOptions;
  mascota : Animal;
  activeIndex: number = 0;
  nameFolderImages: String;
  listOfUrls : String[] = [];
  petsAndImage: any[];
  visibleSpinner: boolean;
  visible2:boolean;
  loading: boolean;
  selectAll: boolean = false;
  totalRecords: number;
  selectedCustomers: Animal[];
  displayNota: boolean = false;
  noteSelected: any;
  listOfImagesPetSelected: any[] =[];
  listOfImagesPetSelected2: any[] =[];

  @Input() petSelectedToEdit: any;

  constructor(private mascotasService: MascotasService, private storage: Storage,) {

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

	ngOnInit() {
      this.visibleSpinner=true;
      this.visible2=false;
      this.mascotasService.getPets().subscribe((res) =>{
        this.listofPets = res.map((e)=> {
          return{
            id: e.payload.doc.id,
            ... (e.payload.doc.data() as Animal)
          }
        })
        this.filtrado = this.listofPets.filter((item)=> item.etiqueta == "Urgente")

        this.getImage()
      })
    }

    viewDialogNota(event,element){
      this.displayNota=true;
      this.noteSelected = element
      this.getImages4()
    }

    getImages4() {
      if (this.noteSelected.pet) {
        // para traer las imagenes de la mascota que estamos editando, solo buscamos en la carpeta comun: mascotas perdidas y luego concatenamos el nombre de la mascota
        const imagesRef = ref(this.storage, `mascotas_adopcion/${this.noteSelected.pet.nombre}`+`_`+`${this.noteSelected.pet.id}`);
        listAll(imagesRef).then(
          async res => {
            this.listOfImagesPetSelected2 = [];
            for (let item of res.items) {
              const idImage = item.name.split('_');
              // si el nombre de la imagen es igual a la id de la mascota que estamos editando, la traemos
              if (idImage[0] === this.noteSelected.pet.id) {
                const urlImage = await getDownloadURL(item);
                // arreglo de URLS de las imagenes
                this.listOfImagesPetSelected2.push({
                  url: urlImage,
                });
              }
            }
            this.activeIndex += 1;
          }).catch(error => console.log(error))
      }
    }
    getImage(){
      this.nameFolderImages = "mascotas_adopcion"
      this.filtrado.forEach((pet)=>{
        const imagesRef = ref(this.storage, this.nameFolderImages + `/${pet.nombre}` + `_` + `${pet.id}`);
        listAll(imagesRef).then(
          async res => {
            let listOfImages = [];
            for (let item of res.items) {
              const idImage = item.name.split('_');
              if (idImage[0] === 'undefined') {
                idImage[0] = pet.id;
              }
              // si el nombre de la imagen es igual a la id de la mascota que estamos editando, la traemos
              if (idImage[0] === pet.id) {
                const urlImage = await getDownloadURL(item);
                // arreglo de URLS de las imagenes
                listOfImages.push({
                  url: urlImage,
                  name: item.name,
                  pet: pet,
                  cuestionario: pet.linkCuestionario
                });
              }
            }
            this.listOfImagesPetSelected.push(listOfImages[0])
          }).then(final =>
            setTimeout(()=>{
              this.visibleSpinner=false
              this.visible2=true
            },2000)
          ).catch(error => console.log(error))
      })

    }



}
