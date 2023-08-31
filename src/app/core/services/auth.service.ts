import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

/* Importando Modelos */
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  /* Iniciar sesión con correo personal */
  customAuth(email: string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  /* Iniciar sesión con Google */
  googleAuth() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  /* Cerrar sesión */
  logout(){
    this.afAuth.signOut();
  }

  /* Registrar nuevo usuario */
  registerUser(nuevoUsuario: Usuario){
    return this.afAuth.createUserWithEmailAndPassword(nuevoUsuario.email, nuevoUsuario.password);

  }

  /* Crear el usuario en la colección de Usuarios */
  createUser(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  /* Obtener el estado del usuario */
  stateUser(){
    return this.afAuth.authState;
  }

  /* Obtener usuario específico con el id */
  getUser<tipo>(path: string, id: string){
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }


  /* Funciones chingonas de eddea, promesas => asincronas */
  async getID(){
    const user= await this.afAuth.currentUser;
    if(user){
      return user.uid;
    }
    return null;
  }

  sendUserId(id){
    return this.firestore
    .collection("usuarios")
    .doc(id)
    .valueChanges()
  }

  /* Obtener datos del usuario actual */
  async getUid(){
    const user = await this.afAuth.currentUser
    if(user){
      return user.uid;
    } else {
      return null;
    }
  }

}
