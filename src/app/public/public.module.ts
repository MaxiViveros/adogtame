/* Módulos */
import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

/* Componentes */
import { HomeComponent } from './home/pages/home.component';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/pages/login.component';
import { EventosComponent } from './novedades/pages/eventos/eventos.component';
import { EducacionComponent } from './novedades/pages/educacion/educacion.component';
import { NosotrosComponent } from './nosotros/pages/nosotros.component';
import { SomosComponent } from './nosotros/components/somos/somos.component';
import { MisionComponent } from './nosotros/components/mision/mision.component';
import { GaleriamascotasComponent } from './home/components/galeriamascotas/galeriamascotas.component';
import { EducacionhomeComponent } from './home/components/educacionhome/educacionhome.component';
import { EventohomeComponent } from './home/components/eventohome/eventohome.component';
import { ImageheaderComponent } from "./home/components/imageheader/imageheader.component";
import { ServicioshomeComponent } from './home/components/servicioshome/servicioshome.component';
import { IniciarSesionComponent } from './login/components/iniciar-sesion/iniciar-sesion.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
import { GalleriaModule } from 'primeng/galleria';
import { GloboComponent } from './nosotros/components/globo/globo.component';
import { DogoanimatedComponent } from './nosotros/components/dogoanimated/dogoanimated.component';
import { CardMascotaComponent } from './mascotas/components/card-mascota/card-mascota.component';
import { GaleriaMascotasComponent } from './mascotas/pages/galeria-mascotas/galeria-mascotas.component';
import {CarouselModule} from 'primeng/carousel';
import { UltimosCasosHomeComponent } from './home/components/ultimos-casos-home/ultimos-casos-home.component';
import { PrivateModule } from '../private/private.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DataViewModule} from 'primeng/dataview';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import { CarouselMascotasComponent } from '../private/mascotas/components/carousel-mascotas/carousel-mascotas.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from "primeng/inputtext";
import { AdoptionPetsComponent } from './mascotas/components/adoption-pets/adoption-pets.component';
import { LostPetsComponent } from './mascotas/components/lost-pets/lost-pets.component';
import {RippleModule} from "primeng/ripple";
import { VetActivosComponent } from './vet-activos/pages/vet-activos.component';
import { DonateComponent } from './donate/donate.component';
import {SkeletonModule} from "primeng/skeleton";
import { ReactiveFormsModule } from "@angular/forms";
import { MapsComponent } from './vet-activos/maps/maps.component';
import {GMapModule} from 'primeng/gmap';


@NgModule({
    imports: [
        CardModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        PublicRoutingModule,
        SharedModule,
        TableModule,
        TimelineModule,
        GalleriaModule,
        CarouselModule,
        PrivateModule,
        ProgressSpinnerModule,
        ButtonModule,
        DialogModule,
        PrivateModule,
        TabViewModule,
        DataViewModule,
        InputTextModule,
        RippleModule,
        SkeletonModule,
        ReactiveFormsModule,
        GMapModule,
    ],
  declarations: [
      PublicComponent,
      HomeComponent,
      LoginComponent,
      EventosComponent,
      EducacionComponent,
      NosotrosComponent,
      SomosComponent,
      MisionComponent,
      GaleriamascotasComponent,
      EducacionhomeComponent,
      EventohomeComponent,
      ImageheaderComponent,
      ServicioshomeComponent,
      IniciarSesionComponent,
      DogoanimatedComponent,
      GloboComponent,
      CardMascotaComponent,
      GaleriaMascotasComponent,
      UltimosCasosHomeComponent,
      AdoptionPetsComponent,
      LostPetsComponent,
      VetActivosComponent,
      UltimosCasosHomeComponent,
      DonateComponent,
      MapsComponent
    ],
  exports: [],
  providers: [],
})
export class PublicModule {
  constructor() {}
}
