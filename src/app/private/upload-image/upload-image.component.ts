import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirestorageService} from "../../core/services/firestorage.service";
import {FileItem} from "../../core/models/file-item";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  providers: [FirestorageService]
})
export class UploadImageComponent implements OnInit {
  files: FileItem[] = [];
  isOverDrop = false;
  upload: boolean = false;
  itemUpload: any;

  @Input() petSelectedToUpload: any;
  @Input() folderName: any;
  @Input() eventSelectedToUpload: any;
  @Output() isUploadEvent= new EventEmitter<boolean>();
  @Output() listOfFiles= new EventEmitter<FileItem[]>();
  @Input() articleSelectedToUpload: any;

  constructor(
    private fireStorage: FirestorageService
  ) { }

  setUpload(value: boolean) {
    this.isUploadEvent.emit(value);
  }

  ngOnInit(): void {
    this.setUpload(false);
    if (this.petSelectedToUpload) {
      this.itemUpload = this.petSelectedToUpload;
    }
    if (this.eventSelectedToUpload) {
      this.itemUpload = this.eventSelectedToUpload;
    }
    if (this.articleSelectedToUpload) {
      this.itemUpload = this.articleSelectedToUpload;
    }
    console.log(this.itemUpload);
  }

  onUpload(item: any) {
    console.log(item);
    if (this.folderName === 'mascotas_adopcion') {
      // foldername/nombremascota_idmascota/idmascota
      this.fireStorage.uploadImage(this.files, this.folderName+`/${item.nombre}`+`_`+`${item.id}`+`/${item.id}`);
      this.upload = true;
      this.setUpload(this.upload);
    }
    if (this.folderName === 'mascotas_perdidas') {
      // foldername/nombremascota_idmascota/idmascota
      this.fireStorage.uploadImage(this.files, this.folderName+`/${item.nombre}`+`_`+`${item.id}`+`/${item.id}`);
      this.upload = true;
      this.setUpload(this.upload);
    }
    if (this.folderName === 'eventos') {
      this.fireStorage.uploadImage(this.files, this.folderName+`/${item.titulo}`+`_`+`${item.id}`+`/${item.id}`);
      this.upload = true;
      this.setUpload(this.upload);
    }
    if (this.folderName === 'articulos') {
      this.fireStorage.uploadImage(this.files, this.folderName+`/${item.titulo}`+`_`+`${item.id}`+`/${item.id}`);
      this.upload = true;
      this.setUpload(this.upload);
    }
    if (this.folderName === 'carousel') {
      this.fireStorage.uploadImageCarouselHome(this.files, this.folderName+`/`+this.folderName);
      this.upload = true;
      this.setUpload(this.upload);
    }

  }

}
