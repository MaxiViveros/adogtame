import { Injectable } from '@angular/core';
// Modulos para DB con Firetore
import { AngularFirestore } from '@angular/fire/compat/firestore';


//modelo
import {Articulo} from '../models/articulo'


@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private angularFirestore: AngularFirestore) { }

  //metodos CRUD

  getPosts() {
    return this.angularFirestore
    .collection("articulos")
    .snapshotChanges()
  }

  getPostById(id){
    return this.angularFirestore
    .collection("articulos")
    .doc(id)
    .valueChanges()
  }

  createPost(educacion: Articulo){
    return new Promise<any> ((resolve, rejects)=>{
      this.angularFirestore
      .collection("articulos")
      .add(educacion)
      .then((response)=>{
        console.log(response)
      },(error) => {
        rejects(error)
      })
    })
  }

  updatePost(educacion: Articulo, id){
    return this.angularFirestore
    .collection("articulos")
    .doc(id)
    .update({
      descripcion: educacion.descripcion,
      etiqueta: educacion.etiqueta,
      fechaCreacion: educacion.fechaCreacion,
      titulo: educacion.titulo,
      fuente: educacion.fuente
    });
  }

  deletePost(educacion){
    return this.angularFirestore
    .collection("articulos")
    .doc(educacion.id)
    .delete()
  }
}
