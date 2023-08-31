/* Módulos */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Componentes */
import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/pages/home.component";
import { LoginComponent } from "./login/pages/login.component";
import { EducacionComponent } from './novedades/pages/educacion/educacion.component';
import { NosotrosComponent } from './nosotros/pages/nosotros.component';
import { PerfilComponent } from '../private/usuario/pages/perfil/perfil.component';
import { EventosComponent } from './novedades/pages/eventos/eventos.component';
import { GaleriaMascotasComponent } from './mascotas/pages/galeria-mascotas/galeria-mascotas.component';
import { VetActivosComponent } from './vet-activos/pages/vet-activos.component';
import {DonateComponent} from "./donate/donate.component";

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children:
    [   {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'login', component: LoginComponent},
        {path: 'nosotros', component: NosotrosComponent},
        {path: 'educacion', component: EducacionComponent},
        {path: 'perfil', component: PerfilComponent},
        {path: 'eventos', component: EventosComponent},
        {path: 'mascotas', component: GaleriaMascotasComponent},
        {path: 'veterinarios-activos', component: VetActivosComponent},
        {path: 'donar', component: DonateComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
