import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Storage} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})

export class VeterinariasService {
  constructor(
    private angularFirestore: AngularFirestore,
    private storage: Storage,
  ) {
  }

  getVets() {
    return this.angularFirestore.collection("veterinaria").snapshotChanges();
  }

  getVetsById(id) {
    return this.angularFirestore.collection("veterinaria").doc(id).valueChanges();
  }

  deleteVet(vetToDelete: any) {
    //this.deleteFolderImagesOfPets(pet);
    return this.angularFirestore.collection("veterinaria").doc(vetToDelete.id).delete()
  }

  createVeterinaria(veterinaria) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection("veterinaria").add(veterinaria).then((response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
    })
  }

  updateVet(veterinaria, veterinariaId) {
    return this.angularFirestore.collection("veterinaria").doc(veterinariaId).update({
      nombre: veterinaria.nombre,
      telefono: veterinaria.telefono,
      direccion: veterinaria.direccion,
      correo: veterinaria.correo,
      paginaWeb: veterinaria.paginaWeb
    })
  }

}
