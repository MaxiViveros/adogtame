import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {MascotasService} from "../../../../core/services/mascotas.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";
import {Image} from "../steps-mascotas/steps-mascotas.component";

@Component({
  selector: 'app-steps-mascotas-adopcion',
  templateUrl: './steps-mascotas-adopcion.component.html',
  styleUrls: ['./steps-mascotas-adopcion.component.scss']
})
export class StepsMascotasAdopcionComponent implements OnInit {
  types: any[];
  typeSelected: any;
  sexTypes: any[];
  sexSelected: any;
  itemsForEdit: MenuItem[];
  itemsForNew: MenuItem[];
  activeIndex: number = 0;
  loading: boolean = false;
  adoptionForm: FormGroup;
  completedForm: boolean = false;
  isUpload: boolean;
  displayNotUploadImages: boolean = false;
  listOfImages: Image[];
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
    private mascotasService: MascotasService,
    public formBuilder: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private storage: Storage,
  ) {
    this.adoptionForm = this.formBuilder.group({
      edad: [''],
      nombre: [''],
      raza: [''],
      sexo: [''],
      tipo: [''],
      tipoCaso: [''],
      contacto: [''],
      observaciones: [''],
      linkCuestionario: ['']
    });
  }

  ngOnInit(): void {
    this.nameFolderImages = 'mascotas_adopcion';
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

  onSubmitAddLostPet() {
  }

  nextPage(formSelected) {
    if (formSelected.value.edad && formSelected.value.nombre && formSelected.value.raza &&
      formSelected.value.sexo && formSelected.value.tipo && formSelected.value.linkCuestionario) {
      this.activeIndex += 1;
      if (this.activeIndex > 3) {
        this.activeIndex = 0;
      }
    }
    else {
      this.completedForm = true;
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

  savePetData() {
    if (this.displayAdd) {
      this.adoptionForm.value.tipoCaso = this.adoptionForm.value.tipoCaso.toLowerCase();
      this.mascotasService.createPet(this.adoptionForm.value);
      this.closeDialog(false);
      this.activeIndex = 0;
      this.adoptionForm.reset()
    }
    else if (this.displayEdit) {
      this.formEdit.value.tipoCaso = this.formEdit.value.tipoCaso.toLowerCase();
      this.mascotasService.updatePet(this.formEdit.value, this.petSelectedToEdit.id);
      this.closeDialog(false);
      this.activeIndex = 0;
      this.formEdit.reset()
    }

  }

  cancel() {
    // al apretar el boton cancelar en el modal, se cierra y se resetea
    this.activeIndex = 0;
    this.closeDialog(false);
  }

  isUploadFiles(upload: boolean) {
    this.isUpload = upload;
  }

  nextPageImages() {
    if (!this.isUpload) {
      this.displayNotUploadImages = true;
    }
    else {
      this.getImages();
    }
  }

  getImages() {
    if (this.petSelectedToEdit) {
      // para traer las imagenes de la mascota que estamos editando, solo buscamos en la carpeta comun: mascotas perdidas y luego concatenamos el nombre de la mascota
      const imagesRef = ref(this.storage, this.nameFolderImages+`/${this.petSelectedToEdit.nombre}`+`_`+`${this.petSelectedToEdit.id}`);
      listAll(imagesRef).then(
        async res => {
          this.listOfImages = [];
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === 'undefined') {
              idImage[0] = this.petSelectedToEdit.id;
            }
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
}
