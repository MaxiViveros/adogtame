import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  private uid: string= null;
  email: string= null;
  nombre: string= null;
  perfil: string= null;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    this.uid= await this.authService.getID()
    this.cargarDatos()
  }

  async cargarDatos() {
      const user= await this.authService.getUser<Usuario>('usuarios', this.uid).subscribe( res => {
        if(res) {
          this.email = res.email;
          this.nombre= res.nombre;
          this.perfil= res.perfil;
        }
      })
  }

}
