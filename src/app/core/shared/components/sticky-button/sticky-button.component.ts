import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Se importa sweet alert 2 */
import Swal from 'sweetalert2'

/* Importando el servicio auth */
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sticky-button',
  templateUrl: './sticky-button.component.html',
  styleUrls: ['./sticky-button.component.scss']
})
export class StickyButtonComponent implements OnInit {

  logged: boolean = false;
  abierto: boolean = false;

  constructor(private authService: AuthService,
              private router: Router)
              {
                this.verificarEstado();
              }

  ngOnInit(): void { }

  abrirUsuario(){
    this.abierto = !this.abierto;
  }

  irHacia(direccion: string){
    this.router.navigate([direccion]);
  }

  cerrarSesion(){
    this.authService.logout();
    this.showSwal("¡Sesión finalizada!", "success");
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

  private verificarEstado(){
    this.authService.stateUser().subscribe( res => {
      if (res) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    })
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
}
