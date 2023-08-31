import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    logged: boolean = false;
    arrows: any;
    sidebar: any;
    rol: 'directiva' | 'socio' | 'adoptante' = null;
  
    constructor(private router: Router,
                private authService: AuthService)
                {
                  this.verificarEstado();
                }
  
    ngOnInit(): void {
      //this.arrows = document.getElementsByName("dropdown");
      this.sidebar = document.querySelector(".navbar");
    }
  
    abrirSubMenu(id:any){
      this.arrows[id].classList.toggle("showMenu");
    }
  
    navegarHacia(direccion:any){
      this.router.navigate([direccion]);
    }
  
    private verificarEstado(){
      this.authService.stateUser().subscribe( res => {
        if (res) {
          this.logged = true;
          this.obtenerDatosUsuario(res.uid);
        } else {
          this.logged = false;
        }
      })
    }
  
    private obtenerDatosUsuario(uid: string){
      const path = 'usuarios';
      const id = uid;
      this.authService.getUser<Usuario>(path, id).subscribe( res => {
        if(res) {
          this.rol = res.perfil;
        }
      })
    }
    cerrarSesion(){
      this.authService.logout();
      this.router.navigate(['login']);
    }
  
    perfil(){
      if(this.logged){
        this.router.navigate(['perfil']);
      }
    }
  
    verLogin(){
      this.router.navigate(['login']);
    }
  
    verEventos(){
      this.router.navigate(['eventos']);
    }
  
  }