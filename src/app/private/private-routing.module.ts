/* Módulos */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Vista Padre */
import { PrivateComponent } from './private.component';

/* Vistas de Eventos */
import { ListarEventosComponent } from './eventos/pages/listar-eventos/listar-eventos.component';

/* Vistas de Educación */
import { ListarEducacionComponent } from "./educacion/pages/listar-educacion/listar-educacion.component";

/* Vistas de Usuario */
import { DashboardComponent } from "./usuario/pages/dashboard/dashboard.component";
import { PerfilComponent } from './usuario/pages/perfil/perfil.component';

/* Vistas de Mascotas */
import { ListarMascotasComponent } from "./mascotas/pages/listar-mascotas/listar-mascotas.component";
import { CrudMascotasPerdidasComponent } from './mascotas/components/crud-mascotas-perdidas/crud-mascotas-perdidas.component';
import { VigilantePrivadoGuard } from './vigilante-privado.guard';
import { VigilanteGestionGuard } from './vigilante-gestion.guard';
import {VeterinariasComponent} from "./veterinarias/veterinarias.component";
import { SociosComponent } from './socios/socios.component';
import {CarouselHomeComponent} from "./carousel-home/carousel-home.component";

const routes: Routes = [
  //TODO LOGUEADO
  {
    path: '',
    component: PrivateComponent, canActivate:[VigilantePrivadoGuard],
    children:
    [
      {path: '', redirectTo: 'private/usuario/dashboard', pathMatch: 'full'},
      {path: 'private/usuario/dashboard', component: DashboardComponent},
      {path: 'private/usuario/perfil', component: PerfilComponent},
    ],
  },
  //DIRECTIVA
  {
    path: '',
    component: PrivateComponent, canActivate:[VigilanteGestionGuard],
    children:
    [
      {path: '', redirectTo: 'private/usuario/dashboard', pathMatch: 'full'},
      {path: 'private/gestion/educacion', component: ListarEducacionComponent},
      {path: 'private/gestion/eventos', component: ListarEventosComponent},
      {path: 'private/gestion/mascotas', component: ListarMascotasComponent},
      {path: 'private/gestion/mascotas-perdidas', component: CrudMascotasPerdidasComponent},
      {path: 'private/gestion/veterinarias', component: VeterinariasComponent},
      {path: 'private/gestion/socios', component: SociosComponent},
      {path: 'private/gestion/carousel-home', component: CarouselHomeComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
