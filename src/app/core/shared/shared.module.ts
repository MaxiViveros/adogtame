/* Módulos */
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/* Componentes */
import { FooterComponent } from './components/footer/footer.component';
import { GaleriaMascotasComponent } from './components/galeria-mascotas/galeria-mascotas.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VeterinariosComponent } from './components/veterinarios/veterinarios.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StickyButtonComponent } from './components/sticky-button/sticky-button.component';
import { HeaderComponent } from './components/header/header.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
    imports: [
      ButtonModule,
      CommonModule,
      HttpClientModule,
    ],
    declarations: [
      FooterComponent,
      GaleriaMascotasComponent,
      NotFoundComponent,
      VeterinariosComponent,
      NavbarComponent,
      SidebarComponent,
      StickyButtonComponent,
      HeaderComponent,
      TopbarComponent,
    ],
    exports: [
      FooterComponent,
      GaleriaMascotasComponent,
      HttpClientModule,
      NotFoundComponent,
      RouterModule,
      NavbarComponent,
      SidebarComponent,
      StickyButtonComponent,
      HeaderComponent,
      TopbarComponent
    ],
    providers: [],
})
export class SharedModule {
  constructor() {}
}
