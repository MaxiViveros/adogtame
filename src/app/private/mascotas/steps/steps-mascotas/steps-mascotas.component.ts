import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MascotasService } from 'src/app/core/services/mascotas.service';
import { EventEmitter } from '@angular/core';
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {FirestorageService} from "../../../../core/services/firestorage.service";

export interface Image {
  id?:string;
  name?:string;
  description?:string;
  url?:string;
}

@Component({
  selector: 'app-steps-mascotas',
  templateUrl: './steps-mascotas.component.html',
  styleUrls: ['./steps-mascotas.component.scss'],
  providers: [FirestorageService]
})
export class StepsMascotasComponent implements OnInit {
  itemsForEdit: MenuItem[];
  itemsForNew: MenuItem[];
  activeIndex: number = 0;
  loading: boolean = false;
  lostPetForm: FormGroup;
  lostPetFormEdit: FormGroup;
  completedForm: boolean = false;
  listOfImages: Image[];
  displayNotUploadImages: boolean = false;

  isOverDrop = false;
  isUpload: boolean;
  nameFolderImages: any;

  @Input() displayAdd: boolean;
  @Input() displayEdit: boolean;
  @Input() formEdit: FormGroup;
  @Input() petSelectedToEdit: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  closeDialog(value: boolean) {
    this.closeDialogEvent.emit(value);
  }

  constructor(
    public formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private router: Router,
    private storage: Storage,
    private fireStorage: FirestorageService
  ) {
    this.lostPetForm = this.formBuilder.group({
      edad: [''],
      nombre: [''],
      raza: [''],
      sexo: [''],
      tipo: [''],
      tipoCaso: [''],
      contacto: [''],
      observaciones: [''],
      etiqueta: ['']
    });
    this.lostPetFormEdit = this.formBuilder.group({
      edad: [''],
      nombre: [''],
      raza: [''],
      sexo: [''],
      tipo: [''],
      tipoCaso: [''],
      contacto: [''],
      observaciones: [''],
      etiqueta: ['']
    });
    this.listOfImages = [];
  }

  ngOnInit(): void {
    this.nameFolderImages = 'mascotas_perdidas';
    this.itemsForEdit = [
      {
        label: 'Datos',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Cargar imágenes',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Imágenes cargadas',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Confirmación',
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
    ];

    this.itemsForNew = [
      {
        label: 'Datos',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Confirmación',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
    ];
  }

  nextPage(formSelected) {
    if (formSelected.value.edad && formSelected.value.nombre && formSelected.value.raza &&
      formSelected.value.sexo && formSelected.value.tipo && formSelected.value.tipoCaso) {
      this.activeIndex += 1;
      if (this.activeIndex > 3) {
        this.activeIndex = 0;
      }
    }
    else {
      this.completedForm = true;
    }
  }

  nextPageImages() {
    if (!this.isUpload) {
      this.displayNotUploadImages = true;
    }
    else {
      this.getImages();
    }
  }

  continueAnyway() {
    this.displayNotUploadImages = false;
    this.getImages();
  }

  notContinue() {
    this.displayNotUploadImages = false;
  }

  backPage() {
    this.activeIndex -= 1;
    if (this.activeIndex < 0) {
      this.activeIndex = 0;
    }
  }

  cancel() {
    // al apretar el boton cancelar en el modal, se cierra y se resetea
    this.activeIndex = 0;
    this.closeDialog(false);
  }

  onSubmitAddLostPet() {
    //this.mascotasService.createLostPet(this.lostPetForm.value);
    //this.router.navigate(['/private/gestion/mascotas-perdidas']);
  }

  savePetData() {
    if (this.displayAdd) {
      this.lostPetForm.value.tipoCaso = this.lostPetForm.value.tipoCaso.toLowerCase();
      this.mascotasService.createLostPet(this.lostPetForm.value);
      this.closeDialog(false);
      this.activeIndex = 0;
      this.lostPetForm.reset()
    }
    else if (this.displayEdit) {
      this.formEdit.value.tipoCaso = this.formEdit.value.tipoCaso.toLowerCase();
      this.mascotasService.updateLostPet(this.formEdit.value, this.petSelectedToEdit.id);
      this.closeDialog(false);
      this.activeIndex = 0;
      this.formEdit.reset()
    }

  }

  uploadImage(event: any, petSelected:any) {
    const file = event.target.files[0];
    // guardamos la imagen en una carpeta llamada con el nombre de la mascota que estamos editando y el nombre de la imagen será la id de la mascota que estamos editando

    const imgRef = ref(this.storage, `mascotas_perdidas/${petSelected.nombre}`+`_`+`${petSelected.id}`+`/${petSelected.id}`);
    uploadBytes(imgRef, file).then().catch(error => console.log(error));
  }

  getImages() {
    if (this.petSelectedToEdit) {
      // para traer las imagenes de la mascota que estamos editando, solo buscamos en la carpeta comun: mascotas perdidas y luego concatenamos el nombre de la mascota
      const imagesRef = ref(this.storage, `mascotas_perdidas/${this.petSelectedToEdit.nombre}`+`_`+`${this.petSelectedToEdit.id}`);
      listAll(imagesRef).then(
        async res => {
          this.listOfImages = [];
          for (let item of res.items) {
            const idImage = item.name.split('_');
            // si el nombre de la imagen es igual a la id de la mascota que estamos editando, la traemos
            if (idImage[0] === this.petSelectedToEdit.id) {
              const urlImage = await getDownloadURL(item);
              // arreglo de URLS de las imagenes
              this.listOfImages.push({
                url: urlImage,
                name: item.name
              });
            }
          }
          this.activeIndex += 1;
        }).catch(error => console.log(error))
    }
    else if (this.displayAdd) {
      this.activeIndex += 1;
    }
  }

  isUploadFiles(upload: boolean) {
    this.isUpload = upload;
  }

}
