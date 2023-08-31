import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import {FileItem} from "../models/file-item";

@Injectable()
export class FirestorageService {
  private MEDIA_STORAGE_PATH = 'images'
  constructor(private readonly storage: AngularFireStorage) { }

  uploadImage(images: FileItem[], fileName) {
    for (const item of images) {
      item.uploading = true;
      const filePath = fileName + '_' + item.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file);

      item.uploadPercent = task.percentageChanges();
      task.snapshotChanges()
        .pipe(finalize(() => {
          item.downloadURL = fileRef.getDownloadURL();
          item.uploading = false;
        })
      ).subscribe();
    }
  }

  uploadImageCarouselHome(images: FileItem[], fileName) {
    for (const item of images) {
      item.uploading = true;
      const filePath = fileName + '_' + item.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file);

      item.uploadPercent = task.percentageChanges();
      task.snapshotChanges()
        .pipe(finalize(() => {
            item.downloadURL = fileRef.getDownloadURL();
            item.uploading = false;
          })
        ).subscribe();
    }
  }

  private generateFileName(name: string): string {
    return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`
  }

}
