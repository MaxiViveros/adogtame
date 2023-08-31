import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Se importa sweet alert 2 */
import Swal from 'sweetalert2'

/* Importando el servicio auth */
import { AuthService } from 'src/app/core/services/auth.service';

/* Importando modelos */
import { Credenciales } from "src/app/core/models/credenciales.model";
import { Usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  /* Variables de elementos HTML */
  container: any;
  pwShowHide: any;
  pwFields: any;
  signUp: any;
  loginLink: any;

  /* Variable para iniciar sesión */
  credenciales: Credenciales = {
    email: null,
    password: null
  }

  /* Variable para registrarse */
  nuevoUsuario: Usuario = {
    nombre: null,
    email: null,
    uid: null,
    password: null,
    perfil: 'adoptante'
  }

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarElementos();
    this.cargarEye();
    this.cargarTransicion();
  }

  async login(){
    Swal.showLoading();
    await this.authService.customAuth(this.credenciales.email, this.credenciales.password)
      .then(res => {
        Swal.hideLoading();
        this.router.navigate(['home']);
        this.showSwal("¡Sesión iniciada con éxito!", "success");
      })
      .catch( error => {
        Swal.hideLoading();
        this.showSwal("¡Usuario o contraseña incorrecto!", "error");
      });
  }

  async loginWithGoogle(){
    Swal.showLoading();
    await this.authService.googleAuth()
      .then(async res => {
        Swal.hideLoading();
        this.registrarseGoogle(res);
        this.router.navigate(['home']);
        this.showSwal("¡Sesión iniciada con éxito!", "success");
      })
      .catch( error => {
        Swal.hideLoading();
        this.showSwal("¡Datos incorrectos!", "error");
      });
  }

  async registrarse(){
    Swal.showLoading();
    await this.authService.registerUser(this.nuevoUsuario)
    .then(async res => {
      Swal.hideLoading();
      const path = 'usuarios';
      const id = res.user.uid;
      this.nuevoUsuario.uid = id;
      this.nuevoUsuario.password = null;
      await this.authService.createUser(this.nuevoUsuario, path, id);
      this.showSwal("¡Registrado con éxito!", "success");
      this.router.navigate(['home']);
    })
    .catch( error => {
      Swal.hideLoading();
      this.showSwal("¡Error con el registro!", "error");
    });
  }

  private async registrarseGoogle(res: any){
    const path = 'usuarios';
    const id = res.user.uid;
    this.nuevoUsuario.uid = id;
    this.nuevoUsuario.nombre = res.user.displayName;
    this.nuevoUsuario.email = res.user.email;
    this.nuevoUsuario.password = null;
    await this.authService.createUser(this.nuevoUsuario, path, id);
  }

  private showSwal(mensaje: any, tipo: any){
    Swal.fire({
      position: 'top-end',
      icon: tipo,
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
  }

  private cargarElementos(){
    this.container = document.querySelector(".container");
    this.pwShowHide = document.querySelectorAll(".showHidePw");
    this.pwFields = document.querySelectorAll(".password");
    this.signUp = document.querySelector(".signup-link");
    this.loginLink = document.querySelector(".login-link");
  }

  private cargarEye(){
    this.pwShowHide.forEach(eyeIcon =>{
      eyeIcon.addEventListener("click", ()=>{
          this.pwFields.forEach(pwField =>{
              if(pwField.type ==="password"){
                  pwField.type = "text";

                  this.pwShowHide.forEach(icon =>{
                      icon.classList.replace("bx-low-vision", "bxs-bullseye");
                  })
              }else{
                  pwField.type = "password";

                  this.pwShowHide.forEach(icon =>{
                      icon.classList.replace("bxs-bullseye", "bx-low-vision");
                  })
              }
          })
      })
    })
  }

  private cargarTransicion(){
    this.signUp.addEventListener("click", ( )=>{
      this.container.classList.add("active");
    });
    this.loginLink.addEventListener("click", ( )=>{
      this.container.classList.remove("active");
    });
  }
}
