/* Módulos */
import {CommonModule, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import {StepsModule} from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

/* Componente Padre*/
import { PrivateComponent } from './private.component';

/* Componentes del módulo Eventos */
import { CrudEventosComponent } from './eventos/components/crud-eventos/crud-eventos.component';
import { ListarEventosComponent } from "./eventos/pages/listar-eventos/listar-eventos.component";

/* Componentes del módulo Educación */
import { CrudEducacionShowComponent } from './educacion/components/crud-educacion-show/crud-educacion-show.component';
import { ListarEducacionComponent } from './educacion/pages/listar-educacion/listar-educacion.component';

/* Componentes del módulo mascotas */
import { CrudMascotasComponent } from './mascotas/components/crud-mascotas/crud-mascotas.component';
import { ListarMascotasComponent } from './mascotas/pages/listar-mascotas/listar-mascotas.component';

/* Componentes del módulo Usuario */
import { DashboardComponent } from './usuario/pages/dashboard/dashboard.component';
import { PerfilComponent } from './usuario/pages/perfil/perfil.component';

/* Otros Componentes */
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { CrudMascotasPerdidasComponent } from './mascotas/components/crud-mascotas-perdidas/crud-mascotas-perdidas.component';
import { StepsMascotasComponent } from './mascotas/steps/steps-mascotas/steps-mascotas.component';
import { MessageService } from 'primeng/api';
import { PerfilUsuarioComponent } from './usuario/components/perfil-usuario/perfil-usuario.component';
import { StepsMascotasAdopcionComponent } from './mascotas/steps/steps-mascotas-adopcion/steps-mascotas-adopcion.component';
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {getStorage, provideStorage, StorageModule} from "@angular/fire/storage";
import { UploadImageComponent } from './upload-image/upload-image.component';
import { NgFilesDirective } from './upload-image/directives/ng-files.directive';
import { CarouselMascotasComponent } from './mascotas/components/carousel-mascotas/carousel-mascotas.component';
import {CarouselModule} from "primeng/carousel";
import {DropdownModule} from "primeng/dropdown";
import { StepsEventosComponent } from './eventos/steps-eventos/steps-eventos.component';
import { VeterinariasComponent } from './veterinarias/veterinarias.component';
import { StepsEducacionComponent } from './educacion/steps-educacion/steps-educacion.component';
import { SociosComponent } from './socios/socios.component';
import {VeterinariasService} from "../core/services/veterinarias.service";
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { StepsCarouselHomeComponent } from './carousel-home/steps-carousel-home/steps-carousel-home.component';

@NgModule({
  declarations: [
    PrivateComponent,
    ListarEducacionComponent,
    CrudEducacionShowComponent,
    ListarEventosComponent,
    CrudEventosComponent,
    DashboardComponent,
    PerfilComponent,
    ListarMascotasComponent,
    CrudMascotasComponent,
    CrudMascotasPerdidasComponent,
    StepsMascotasComponent,
    PerfilUsuarioComponent,
    StepsMascotasAdopcionComponent,
    UploadImageComponent,
    NgFilesDirective,
    CarouselMascotasComponent,
    StepsEventosComponent,
    VeterinariasComponent,
    StepsEducacionComponent,
    SociosComponent,
    CarouselHomeComponent,
    StepsCarouselHomeComponent,
  ],
    imports: [
        CalendarModule,
        CommonModule,
        DialogModule,
        FormsModule,
        PrivateRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        SplitButtonModule,
        TableModule,
        StepsModule,
        ToastModule,
        RippleModule,
        CardModule,
        StorageModule,
        provideStorage(() => getStorage()),
        CarouselModule,
        DropdownModule
    ],
    exports: [
      CarouselMascotasComponent
    ],

    providers: [
      MessageService, VeterinariasService
    ]
})
export class PrivateModule { }
