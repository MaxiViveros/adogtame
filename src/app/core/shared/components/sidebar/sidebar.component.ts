import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
    this.arrows = document.getElementsByName("dropdown");
    this.sidebar = document.querySelector(".sidebar");
  }

  abrirSubMenu(id:any){
    this.arrows[id].classList.toggle("showMenu");
  }

  cambiarSidebar(){
    this.sidebar.classList.toggle("close");
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

  verEventos(){
    this.router.navigate(['eventos']);
  }

}
