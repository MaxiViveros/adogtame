import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  uid: string = null;
  infoUser: Usuario = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.verificarEstado();
  }

  private verificarEstado(){
    this.authService.stateUser().subscribe( res => {
      this.obtenerUid();
    })
  }

  private async obtenerUid(){
    await this.authService.getUid()
      .then(res => {
        this.uid = res;
        this.obtenerInfoUsuario();
      })
      .catch( error => {
        this.uid = null;
        console.log(error);
      })
  }

  private obtenerInfoUsuario(){
    const path = 'usuarios';
    const id = this.uid;
    this.authService.getUser<Usuario>(path, id).subscribe( res => {
      this.infoUser = res;
    });
  }

}
