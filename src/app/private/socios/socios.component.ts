import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SociosService } from 'src/app/core/services/socios.service';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { Socio } from 'src/app/core/models/socio.model';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.scss']
})
export class SociosComponent implements OnInit {

  listOfSocios: any[] = [];
  loading: boolean = false;
  displaySocio: boolean = false;
  displayDonacion: boolean = false;
  socio: FormGroup;
  displayAddSocio : boolean = false;
  socioSelected: any;
  displayWhatsAppDialog: boolean = false;
  messageForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private sociosService: SociosService,
    private router: Router,
    ) {
      this.socio = this.formBuilder.group({
        correo: [''],
        nombre: [''],
        monto: [''],
        telefono: ['']
      });
      this.messageForm = this.formBuilder.group({
        body: 'Hola amig@ soci@ de Adogtame!, queremos recordarte hacer tu donación en la fundación, con tu ayuda podemos salvar a muchos animales! 😁'
      })
     }
  ngOnInit(): void {
    this.loading = true;
    this.sociosService.getSocios().subscribe((res) => {
      this.listOfSocios = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Socio)
        }
      });
      this.loading = false;
    });
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
  addSocio() {
    this.displayAddSocio = true;
  }

  onSubmitAddSocio() {
    this.sociosService.createSocio(this.socio.value);
    this.router.navigate(['/donar']);
    this.displaySocio = false;
  }

  editSocio(socio){

  }

  deleteSocio(socio){

  }

  showDialogWSP(socio) {
    this.socioSelected = socio;
    //this.displayWhatsAppDialog = true;
    this.sendWhatsApp();
  }

  sendWhatsApp() {
    window.location.href = `https://api.whatsapp.com/send?phone=`+this.socioSelected.telefono
    /*let body = this.messageForm.value.body;
    let urlBody = body.replace(/ /g,"%");
    console.log(this.socioSelected);
    let url = `https://api.whatsapp.com/send?phone=`+this.socioSelected.telefono+`&text=`+urlBody;*/
    //console.log(url);
  }

}
