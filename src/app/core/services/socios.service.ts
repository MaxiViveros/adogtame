import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Socio } from "../models/socio.model";
import {deleteObject, getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";


@Injectable({
    providedIn: 'root'
  })
  export class SociosService {
    constructor(
      private angularFirestore: AngularFirestore,
      private storage: Storage,
    ) { }
  
    /* Servicios para mascotas en adopción */
  
    getSocios() {
      return this.angularFirestore.collection("socios").snapshotChanges();
    }
  
    getSocioById(id) {
      return this.angularFirestore.collection("socios").doc(id).valueChanges();
    }
  
    createSocio(socio: Socio) {
      return new Promise<any> ((resolve, reject) => {
        this.angularFirestore.collection("socios").add(socio).then((response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
      })
    }
  
  }
  