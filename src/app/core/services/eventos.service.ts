import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Evento } from '../models/evento.model';
import {deleteObject, getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(
    private angularFirestore: AngularFirestore,
    private storage: Storage,
  ) { }

  getEvents() {
    return this.angularFirestore.collection("eventos").snapshotChanges();
  }

  getEventsById(id) {
    return this.angularFirestore.collection("eventos").doc(id).valueChanges();
  }

  createEvent(event: Evento) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection("eventos").add(event).then((response) => {
        console.log(response)
      },
      (error) => {
        reject(error)
      })
    })
  }

  deleteEvent(event) {
    this.deleteFolderImages(event);
    return this.angularFirestore.collection("eventos").doc(event.id).delete()
  }

  updateEvent(event: Evento, idEvent) {
    return this.angularFirestore.collection("eventos").doc(idEvent).update({
      titulo: event.titulo,
      descripcion: event.descripcion,
      fechaCreacion: event.fechaCreacion,
      fechaInicio: event.fechaInicio,
      fechaFin: event.fechaFin,
      linkVideo: event.linkVideo
    })
  }

  deleteImage(event: any, image: any, folderName: any) {
    const imagesRef = ref(this.storage, folderName+`/${event.titulo}`+`_`+`${event.id}`+`/${image.name}`);
    deleteObject(imagesRef).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  }

  deleteFolderImages(event) {
    this.getImages(event, 'eventos');
  }
  //TODO arreglar eliminacion de imagenes de evento
  /* Servicios para traer y eliminar imagenes */
  private getImages(event: any, folderName: any) {
    const imagesRef = ref(this.storage, folderName+`/${event.titulo}`+`_`+`${event.id}`);
    listAll(imagesRef).then(
      async res => {
        for (let item of res.items) {
          const idImage = item.name.split('_');
          // si el nombre de la imagen es igual a la id de la mascota que estamos editando, la traemos
          if (idImage[0] === event.id) {
            const urlImage = await getDownloadURL(item);
            // se eliminan las imagenes de uno a uno para eliminar la carpeta (cuando se elimina una mascota)
            this.deleteImage(event.titulo, item, folderName);
          }
        }
      }).catch(error => console.log(error))
  }

}
