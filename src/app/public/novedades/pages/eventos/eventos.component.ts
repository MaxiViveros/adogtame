import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/core/models/evento.model';
import { EventosService } from 'src/app/core/services/eventos.service';
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  eventList: Evento[];
  nameFolder: "eventos"


  constructor(
    private eventosService: EventosService,
    private storage: Storage,
  ) { }

  ngOnInit(): void {
    this.eventosService.getEvents().subscribe((res) =>{
      this.eventList = res.map( (e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Evento)
        }
      })
      this.getImageEvent();
    })
  }

  getImageEvent() {
    this.eventList.forEach((event) => {
      const imagesRef =  ref(this.storage, this.nameFolder+`/${event.titulo}`+`_`+`${event.id}`)
      listAll(imagesRef).then(
        async res => {
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === event.id) {
              event.urlImage = await getDownloadURL(item)
              break;
            }
          }
        }).catch(error => console.log(error))
    })
  }

}
