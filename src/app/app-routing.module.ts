/* Módulos */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Componentes */
import { NotFoundComponent } from "./core/shared/components/not-found/not-found.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: '', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
