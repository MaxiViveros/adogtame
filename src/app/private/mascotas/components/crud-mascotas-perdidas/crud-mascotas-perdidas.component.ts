import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { Animal } from 'src/app/core/models/animal.model';
import { MascotasService } from 'src/app/core/services/mascotas.service';

@Component({
  selector: 'app-crud-mascotas-perdidas',
  templateUrl: './crud-mascotas-perdidas.component.html',
  styleUrls: ['./crud-mascotas-perdidas.component.scss']
})
export class CrudMascotasPerdidasComponent implements OnInit {

  listOfLostPets: any[] = [];
  displayAddLostPet: boolean = false;
  displayEditLostPet: boolean = false;
  loading: boolean = false;
  displayDeleteLostPet: boolean = false
  lostPetForm: FormGroup;
  lostPetFormEdit: FormGroup;
  lostPetSelectedToDelete: any;
  lostPetSelectedToEdit: any;
  lostPetRef: any;

  constructor(
    public formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private router: Router
  ) {
    this.lostPetForm = this.formBuilder.group({
      edad: [''],
      nombre: [''],
      raza: [''],
      sexo: [''],
      tipo: [''],
      tipoCaso: [''],
      observaciones: [''],
      contacto: [''],
      etiqueta: ['']
    });
    this.lostPetFormEdit = this.formBuilder.group({
      edad: [''],
      nombre: [''],
      raza: [''],
      sexo: [''],
      tipo: [''],
      tipoCaso: [''],
      observaciones: [''],
      contacto: [''],
      etiqueta: ['']
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.mascotasService.getLostPets().subscribe((res) => {
      this.listOfLostPets = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Animal)
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

  addPet() {
    this.displayAddLostPet = true;
  }

  editPet(event,rowData) {
    this.lostPetSelectedToEdit = rowData;
    console.log(this.lostPetSelectedToEdit);
    this.mascotasService.getLostPetsById(rowData.id).subscribe((res) => {
      this.lostPetRef = res;
      this.lostPetFormEdit = this.formBuilder.group({
        edad: [this.lostPetRef.edad],
        nombre: [this.lostPetRef.nombre],
        raza: [this.lostPetRef.raza],
        sexo: [this.lostPetRef.sexo],
        tipo: [this.lostPetRef.tipo],
        tipoCaso: [this.lostPetRef.tipoCaso],
        observaciones: [this.lostPetRef.observaciones],
        contacto: [this.lostPetRef.contacto],
        etiqueta: [this.lostPetRef.etiqueta]
      })
    })
    this.displayEditLostPet = true;
  }

  showDeleteLostPet(event, rowData) {
    this.displayDeleteLostPet = true;
    this.lostPetSelectedToDelete = rowData;
  }

  showFormOfAdoption(event, rowData) {

  }

  onSubmitAddLostPet() {
    this.mascotasService.createLostPet(this.lostPetForm.value);
    this.router.navigate(['/private/gestion/mascotas-perdidas']);
    this.displayAddLostPet = false;
  }

  onSubmitEditLostPet() {
    /*this.mascotasService.updateLostPet(this.lostPetFormEdit.value, this.lostPetSelectedToEdit.id);
    this.displayEditLostPet = false;
    this.router.navigate(['/private/gestion/mascotas-perdidas']);*/
  }

  deleteLostPet () {
    this.mascotasService.deleteLostPet(this.lostPetSelectedToDelete);
    this.displayDeleteLostPet = false;
  }

  displaySteps: boolean = false;
  showSteps(event, rowData) {
    this.displaySteps = true;
  }

  changeDisplaySteps(newDisplayStepsValue: boolean) {
    this.displayAddLostPet = newDisplayStepsValue;
    this.displayEditLostPet = newDisplayStepsValue;
  }

}
