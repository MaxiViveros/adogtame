import { Injectable } from '@angular/core';
import { clippingParents } from '@popperjs/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref();

  constructor() { }

  async subirImagen(nombre: string, imgBase64: any){
    try{
      let respuesta = await this.storageRef.child("eventos/"+nombre).putString(imgBase64, 'data_url')
      //console.log(respuesta)
      return await respuesta.ref.getDownloadURL();

      
    }catch(e){
      console.log(e);
      return null;

    }

    
  }
  showImages(){
    const ruta ='holi'
    const ref = this.storageRef.child("eventos/")
  }
}
