import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/core/models/evento.model';
import { EventosService } from 'src/app/core/services/eventos.service';
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-eventohome',
  templateUrl: './eventohome.component.html',
  styleUrls: ['./eventohome.component.scss']
})
export class EventohomeComponent implements OnInit {
  eventList: Evento[];
  loading: boolean;
  displayMoreInfo: boolean = false
  eventSelected: any;

  constructor(
    private eventosService: EventosService,
    private storage: Storage
    ) {
   }

  ngOnInit(): void {
    this.loading = true;
    this.eventosService.getEvents().subscribe((res) =>{
      this.eventList = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Evento)
        }
      })
      console.log(this.eventList);
      this.getImageEvent();
    })
  }

  showMoreInfo(evt) {
    this.displayMoreInfo = true;
    this.eventSelected = evt;
  }

  getImageEvent() {
    this.eventList.forEach((event) => {
      const imagesRef =  ref(this.storage, 'eventos'+`/${event.titulo}`+`_`+`${event.id}`)
      listAll(imagesRef).then(
        async res => {
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === event.id) {
              event.urlImage = await getDownloadURL(item)
              break;
            }
            console.log(this.eventList);
          }
          this.loading = false;
        }).catch(error => console.log(error))
    })
  }

}
