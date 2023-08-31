import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventosService} from "../../../core/services/eventos.service";
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-steps-eventos',
  templateUrl: './steps-eventos.component.html',
  styleUrls: ['./steps-eventos.component.scss']
})
export class StepsEventosComponent implements OnInit {

  @Input() displayEdit: boolean;
  @Input() displayAdd: boolean;
  @Input() eventSelectedToEdit: any;
  @Input() eventFormEdit: FormGroup;

  itemsForEdit: MenuItem[];
  itemsForNew: MenuItem[];
  activeIndex: number = 0;
  eventForm: FormGroup;
  nameFolderEventsImages = 'eventos'
  isUpload: boolean;
  dateStartSelected: Date;
  dateEndSelected: Date;
  displayNotUploadImages: boolean = false;
  listOfImages: any[] = [];
  displayDialogConfirmationAdd: boolean = false;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  closeDialog(value: boolean) {
    this.closeDialogEvent.emit(value);
  }

  constructor(
    public formBuilder: FormBuilder,
    private eventosService: EventosService,
    private storage: Storage,
  ) {
    this.eventForm = this.formBuilder.group({
      titulo: [''],
      descripcion: [''],
      fechaCreacion: [''],
      fechaInicio: [''],
      fechaFin: [''],
      hora: [''],
      linkVideo: ['']
    });
  }

  ngOnInit(): void {
    this.itemsForEdit = [
      {
        label: 'Información',
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
        label: 'Información',
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
      /*{
        label: 'Cargar imágenes',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },*/
    ];
  }

  onSubmitAddEvent() {

  }

  cancel() {
    this.activeIndex = 0;
    this.closeDialog(false);
  }

  nextPage(formSelected) {
    console.log(formSelected.value);
    if (formSelected.value.titulo && formSelected.value.descripcion && formSelected.value.linkVideo && formSelected.value.fechaInicio && formSelected.value.fechaFin) {
      this.activeIndex += 1;
      this.displayDialogConfirmationAdd = true;
      if (this.activeIndex > 3) {
        this.activeIndex = 0;
      }
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

  isUploadFiles(upload: boolean) {
    this.isUpload = upload;
  }

  getImages() {
    if (this.eventSelectedToEdit) {
      const imagesRef = ref(this.storage, this.nameFolderEventsImages+`/${this.eventSelectedToEdit.titulo}`+`_`+`${this.eventSelectedToEdit.id}`);
      listAll(imagesRef).then(
        async res => {
          this.listOfImages = [];
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === 'undefined') {
              idImage[0] = this.eventSelectedToEdit.id;
            }

            if (idImage[0] === this.eventSelectedToEdit.id) {
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

  saveEventData() {
    const now = new Date();
    if (this.displayAdd) {
      this.eventForm.value.fechaCreacion = now.toString();
      this.eventosService.createEvent(this.eventForm.value);
      this.activeIndex = 0;
      this.closeDialog(false);
      this.eventForm.reset()
    }
    else if (this.displayEdit) {
      this.eventosService.updateEvent(this.eventFormEdit.value, this.eventSelectedToEdit.id);
      this.closeDialog(false);
      this.activeIndex = 0;
      this.eventFormEdit.reset()
    }
  }

  activeUploadImages() {
    this.activeIndex += 1;
  }

  exitWithoutImages() {
    this.closeDialog(false);
    this.activeIndex = 0;
  }

  nextPageImages() {
    if (!this.isUpload) {
      this.displayNotUploadImages = true;
    }
    else {
      this.getImages();
    }
  }

}
