import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { Evento } from 'src/app/core/models/evento.model';
import { EventosService } from 'src/app/core/services/eventos.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crud-eventos',
  templateUrl: './crud-eventos.component.html',
  styleUrls: ['./crud-eventos.component.scss']
})
export class CrudEventosComponent implements OnInit {

  imagenes: any[] = [];
  public previsualizacion: string;
  listOfEvents: Evento[];
  loading: boolean = false;
  displayAddEvent: boolean = false;
  displayUpImage: boolean = false;
  displayEditEvent: boolean = false;
  eventForm: FormGroup;
  editForm: FormGroup;
  eventRef: any;
  dateSelected: Date;
  eventToEdit: any;
  eventSelected: any;
  displayDeleteEvent: boolean = false;
  public archivos: any =[]

  constructor(
    private storageService: StorageService,
    private eventService: EventosService,
    public formBuilder: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute,
    private sanitizier: DomSanitizer
  ) {
    this.eventForm = this.formBuilder.group({
      titulo: [''],
      descripcion: [''],
      fechaCreacion: [''],
      fechaInicio: [''],
      fechaFin: [''],
      hora: [''],
      linkVideo: ['']
    });

    this.editForm = this.formBuilder.group({
      titulo: [''],
      descripcion: [''],
      fechaCreacion: [''],
      fechaInicio: [''],
      fechaFin: [''],
      hora: [''],
      linkVideo: ['']
    });
  }
  ngOnInit(): void {
    this.loading = true;
    this.eventService.getEvents().subscribe((res) => {
      this.listOfEvents = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Evento)
        }
      });
      this.loading = false;
      console.log(this.listOfEvents);
    });
  }

  onSubmitShow(){

  }

  addEvent() {
    //Abrimos el dialog para crear el evento
    this.displayAddEvent = true;
  }

  editEvent(event, element) {
    //Se setea el evento a editar de forma global
    this.eventToEdit = element;
    //Se busca en la BD el evento a editar pasando su ID
    this.eventService.getEventsById(element.id).subscribe((res) => {
      this.eventRef = res;
      this.editForm = this.formBuilder.group({
        titulo: [this.eventRef.titulo],
        descripcion: [this.eventRef.descripcion],
        fechaCreacion: [this.eventRef.fechaCreacion],
        fechaInicio: [this.eventRef.fechaInicio],
        fechaFin: [this.eventRef.fechaFin],
        hora: [this.eventRef.hora],
        linkVideo: [this.eventRef.linkVideo]
      });
    });
    //Se abre el dialog de editar evento
    this.displayEditEvent = true;
  }

  openDropdown(event, element) {
    event.stopPropagation();
  }

  showDeleteEvent(item) {
    this.displayDeleteEvent = true;
    this.eventSelected = item;
  }

  deleteEvent(event) {
    this.eventService.deleteEvent(this.eventSelected);
    this.displayDeleteEvent = false;
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
  }

  changeDisplaySteps(newDisplayStepsValue: boolean) {
    this.displayAddEvent = newDisplayStepsValue;
    this.displayEditEvent = newDisplayStepsValue;
  }

}
