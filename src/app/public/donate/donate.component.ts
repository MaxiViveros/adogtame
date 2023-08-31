import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SociosService } from 'src/app/core/services/socios.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  displaySocio: boolean = false;
  displayDonacion: boolean = false;
  socio: FormGroup;
  displayNotValidNumber: boolean = false;


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
     }


  ngOnInit(): void {
  }
  showDialog() {
    this.displaySocio = true;
  }
  showDialogDonacion() {
    this.displayDonacion = true;
  }
  onSubmitAddSocio() {
    let numero = this.socio.value.telefono.toString();
    if (numero.length != 11){
      this.displayNotValidNumber = true;
      return;
    }
    else {
      this.sociosService.createSocio(this.socio.value);
      this.router.navigate(['/donar']);
      this.displaySocio = false;
    }
  }
}
