import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {EducacionService} from "../../../core/services/educacion.service";
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-steps-educacion',
  templateUrl: './steps-educacion.component.html',
  styleUrls: ['./steps-educacion.component.scss']
})
export class StepsEducacionComponent implements OnInit {

  @Input() displayAdd: boolean;
  @Input() displayEdit: boolean;
  @Input() formEdit: FormGroup;
  @Input() articleSelectedToEdit: any;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  itemsForEdit: MenuItem[];
  itemsForNew: MenuItem[];
  articleForm: FormGroup;
  activeIndex: number = 0;
  nameFolderImages = 'articulos'
  isUpload: boolean;
  displayNotUploadImages: boolean = false;
  listOfImages: any;

  closeDialog(value: boolean) {
    this.closeDialogEvent.emit(value);
  }

  constructor(
    public formBuilder: FormBuilder,
    private educacionService: EducacionService,
    private storage: Storage
  ) {
    this.articleForm = this.formBuilder.group({
      titulo: [''],
      descripcion: [''],
      etiqueta: [''],
      fechaCreacion: [''],
      fuente: ['']
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
    ];
  }

  cancel() {
    // al apretar el boton cancelar en el modal, se cierra y se resetea
    this.activeIndex = 0;
    this.closeDialog(false);
  }

  nextPage(formSelected) {
    if (formSelected.value.titulo && formSelected.value.descripcion && formSelected.value.etiqueta && formSelected.value.fuente) {
      this.activeIndex += 1;
      if (this.activeIndex > 3) {
        this.activeIndex = 0;
      }
    }
  }

  backPage() {
    this.activeIndex -= 1;
    if (this.activeIndex < 0) {
      this.activeIndex = 0;
    }
  }

  saveArticleData() {
    const now = new Date();
    if (this.displayAdd) {
      this.articleForm.value.fechaCreacion = now;
      this.educacionService.createPost(this.articleForm.value);
      this.closeDialog(false);
      this.activeIndex = 0;
      this.articleForm.reset()
    }
    else if (this.displayEdit) {
      this.educacionService.updatePost(this.formEdit.value, this.articleSelectedToEdit.id);
      this.closeDialog(false);
      this.activeIndex = 0;
      this.formEdit.reset()
    }

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
    if (this.articleSelectedToEdit) {
      const imagesRef = ref(this.storage, this.nameFolderImages+`/${this.articleSelectedToEdit.titulo}`+`_`+`${this.articleSelectedToEdit.id}`);
      listAll(imagesRef).then(
        async res => {
          this.listOfImages = [];
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === 'undefined') {
              idImage[0] = this.articleSelectedToEdit.id;
            }
            if (idImage[0] === this.articleSelectedToEdit.id) {
              const urlImage = await getDownloadURL(item);
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

  notContinue() {
    this.displayNotUploadImages = false;
  }

  continueAnyway() {
    this.displayNotUploadImages = false;
    this.getImages();
  }

}
