import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/core/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class VigilanteGestionGuard implements CanActivate {
  logged: boolean = false;
  rol: 'directiva' | 'socio' | 'adoptante' = null;
  constructor(private router: Router,
   private authService: AuthService){

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
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.verificarEstado();
      //console.log(this.rol)
      if(this.rol == 'directiva'){
        //console.log("esta bien")
        return true
      }else{
        //console.log("el problema es aqui")
        //console.log(this.rol)
        this.router.navigate(['/']);
        return false;
      }
      
  }
  
}
