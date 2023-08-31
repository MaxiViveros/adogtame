import { Component, OnInit } from '@angular/core';
import {SortEvent} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {VeterinariasService} from "../../core/services/veterinarias.service";

export interface Veterinaria {
  nombre?: string;
  correo?: string;
  direccion?: string;
  telefono?: string;
  paginaWeb?: string;
}

@Component({
  selector: 'app-veterinarias',
  templateUrl: './veterinarias.component.html',
  styleUrls: ['./veterinarias.component.scss']
})
export class VeterinariasComponent implements OnInit {

  listVets: Veterinaria[];
  loading: boolean = false;
  editVetForm: FormGroup;
  newVetForm: FormGroup;
  displayAddVet: boolean = false;
  vetToEdit: any;
  vetRef: any;
  displayEditVet: boolean = false;
  vetToDelete: any;
  displayDeleteVet: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private veterinariasService: VeterinariasService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.initForm();
    this.getVets();
  }

  updateVeterinaria() {
    this.loading = true;
    this.veterinariasService.updateVet(this.editVetForm.value, this.vetToEdit.id);
    this.displayEditVet = false;
    this.loading = false;
  }

  save() {
    this.displayAddVet = false;
    this.loading = true;
    this.veterinariasService.createVeterinaria(this.newVetForm.value);
    this.loading = false;
    this.newVetForm.reset();
  }

  cancel() {
    this.displayEditVet = false;
    this.displayAddVet = false;
  }

  submitVet() {

  }

  changeDisplaySteps(newDisplayStepsValue: boolean) {
    this.displayAddVet = newDisplayStepsValue;
    this.displayEditVet = newDisplayStepsValue;
  }

  deleteVet() {
    this.veterinariasService.deleteVet(this.vetToDelete);
    this.displayDeleteVet = false;
  }

  showDeleteVet(item) {
    this.vetToDelete = item;
    this.displayDeleteVet = true;
  }

  openDropdown(event) {
    event.stopPropagation();
  }

  editVeterinaria(event, element) {
    this.vetToEdit = element;
    this.veterinariasService.getVetsById(element.id).subscribe((res) => {
      this.vetRef = res;
      this.editVetForm = this.formBuilder.group({
        nombre: [this.vetRef.nombre],
        correo: [this.vetRef.correo],
        direccion: [this.vetRef.direccion],
        telefono: [this.vetRef.telefono],
        paginaWeb: [this.vetRef.paginaWeb]
      })
    })
    this.displayEditVet = true;
  }

  addVeterinaria() {
    this.displayAddVet = true;
  }

  getVets() {
    this.veterinariasService.getVets().subscribe((res) => {
      this.listVets = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Veterinaria)
        }
      })
      this.loading = false;
    })
  }

  initForm() {
    this.newVetForm = this.formBuilder.group({
      nombre: [''],
      correo: [''],
      direccion: [''],
      telefono: [''],
      paginaWeb: ['']
    })
    this.editVetForm = this.formBuilder.group({
      nombre: [''],
      correo: [''],
      direccion: [''],
      telefono: [''],
      paginaWeb: ['']
    })
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

}
