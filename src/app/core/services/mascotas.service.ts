import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Animal } from "../models/animal.model";
import {deleteObject, getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";




@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  constructor(
    private angularFirestore: AngularFirestore,
    private storage: Storage,
  ) { }

  /* Servicios para mascotas en adopción */

  getPets() {
    return this.angularFirestore.collection("mascota").snapshotChanges();
  }

  getPetsById(id) {
    return this.angularFirestore.collection("mascota").doc(id).valueChanges();
  }

  createPet(pet: Animal) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection("mascota").add(pet).then((response) => {
        console.log(response)
      },
      (error) => {
        reject(error)
      })
    })
  }

  deletePet(pet) {
    this.deleteFolderImagesOfPets(pet);
    return this.angularFirestore.collection("mascota").doc(pet.id).delete()
  }

  private deleteFolderImagesOfPets(pet) {
    this.getImages(pet, 'mascotas_adopcion');
  }

  updatePet(pet: Animal, idPet) {
    return this.angularFirestore.collection("mascota").doc(idPet).update({
      edad: pet.edad,
      nombre: pet.nombre,
      raza: pet.raza,
      sexo: pet.sexo,
      tipo: pet.tipo,
      tipoCaso: pet.tipoCaso,
      contacto: pet.contacto,
      observaciones: pet.observaciones,
      linkCuestionario: pet.linkCuestionario,
      etiqueta: pet.etiqueta,
    })
  }

  updateLostPet(lostPet: any, idLostPet) {
    return this.angularFirestore.collection("mascotas-perdidas").doc(idLostPet).update({
      edad: lostPet.edad,
      nombre: lostPet.nombre,
      raza: lostPet.raza,
      sexo: lostPet.sexo,
      tipo: lostPet.tipo,
      tipoCaso: lostPet.tipoCaso,
      contacto: lostPet.contacto,
      observaciones: lostPet.observaciones,
      etiqueta: lostPet.etiqueta
    })
  }

 /* Servicios para mascotas perdidas */
  getLostPets() {
    return this.angularFirestore.collection("mascotas-perdidas").snapshotChanges();
  }

  getLostPetsById(id) {
    return this.angularFirestore.collection("mascotas-perdidas").doc(id).valueChanges();
  }

  createLostPet(lostPet: any) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection("mascotas-perdidas").add(lostPet).then((response) => {
        console.log(response)
      },
      (error) => {
        reject(error)
      })
    })
  }

  deleteLostPet(lostPet) {
    this.deleteFolderImagesOfLostPet(lostPet);
    return this.angularFirestore.collection("mascotas-perdidas").doc(lostPet.id).delete()
  }

  private deleteFolderImagesOfLostPet(lostPet: any) {
    this.getImages(lostPet, 'mascotas_perdidas');
  }
  //TODO arreglar eliminacion de imagenes de mascota
  /* Servicios para traer y eliminar imagenes */
  private getImages(lostPet: any, folderName: any) {
    const imagesRef = ref(this.storage, folderName+`/${lostPet.nombre}`+`_`+lostPet.id);
    listAll(imagesRef).then(
      async res => {
        for (let item of res.items) {
          const idImage = item.name.split('_');
          // si el nombre de la imagen es igual a la id de la mascota que estamos editando, la traemos
          if (idImage[0] === lostPet.id) {
            const urlImage = await getDownloadURL(item);
            // se eliminan las imagenes de uno a uno para eliminar la carpeta (cuando se elimina una mascota)
            this.deleteImage(lostPet.nombre, item, folderName);
          }
        }
      }).catch(error => console.log(error))
  }

  deleteImage(petSelected: any, image: any, folderName: any) {
    const imagesRef = ref(this.storage, folderName+`/${petSelected.nombre}`+`_`+`${petSelected.id}`+`/${image.name}`);
    deleteObject(imagesRef).then(() => {

    }).catch((error) => {
      console.error(error);
    });
  }

  deleteImageArticle(articleSelected: any, image: any, folderName: any) {
    const imagesRef = ref(this.storage, folderName+`/${articleSelected.titulo}`+`_`+`${articleSelected.id}`+`/${image.name}`);
    deleteObject(imagesRef).then(() => {

    }).catch((error) => {
      console.error(error);
    });
  }

  deleteImageCarousel(image: any, folderName: any) {
    const imagesRef = ref(this.storage, folderName+`/${image.name}`);
    deleteObject(imagesRef).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  }

  getOneImage(pet: any, nameFolder: any) {
    const imagesRef = ref(this.storage, nameFolder + `/${pet.nombre}` + `_` + `${pet.id}`);
    listAll(imagesRef).then(
      async res => {
        let listOfImages: any[] = [];
        for (let item of res.items) {
          const idImage = item.name.split('_');
          if (idImage[0] === 'undefined') {
            idImage[0] = pet.id;
          }
          if (idImage[0] === pet.id) {
            const urlImage = await getDownloadURL(item);
            listOfImages.push({
              url: urlImage,
              name: item.name
            });
          }
        }
        console.log(listOfImages[0]);
        return listOfImages[0];
    }).catch(
        error => console.log(error)
    );
  }

}
