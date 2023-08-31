import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/core/models/animal.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MascotasService } from 'src/app/core/services/mascotas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-crud-mascotas',
  templateUrl: './crud-mascotas.component.html',
  styleUrls: ['./crud-mascotas.component.scss']
})
export class CrudMascotasComponent implements OnInit {

  listOfAnimals: Animal[];
  loading: boolean = false;
  displayAddAnimal: boolean = false;
  displayEditAnimal: boolean = false;
  displayDeleteAnimal: boolean = false;
  adoptionForm: FormGroup;
  editAdoptionForm: FormGroup;
  animalRef: any;
  dateSelected: Date;
  animalToEdit: any;
  animalToDelete: any;
  displayFormAdoption: boolean = false;

  constructor(
    private mascotasService: MascotasService,
    public formBuilder: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.adoptionForm = this.formBuilder.group({
      edad: [''],
      nombre: [''],
      raza: [''],
      sexo: [''],
      tipo: [''],
      tipoCaso: [''],
      contacto: [''],
      observaciones: [''],
      linkCuestionario: [''],
      etiqueta: ['']
    });

    this.editAdoptionForm = this.formBuilder.group({
      edad: [''],
      nombre: [''],
      raza: [''],
      sexo: [''],
      tipo: [''],
      tipoCaso: [''],
      contacto: [''],
      observaciones: [''],
      linkCuestionario: [''],
      etiqueta: ['']
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.mascotasService.getPets().subscribe((res) => {
      this.listOfAnimals = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Animal)
        }
      });
      this.loading = false;
    });
  }

  onSubmit() {
    this.mascotasService.createPet(this.adoptionForm.value);
    //Recargamos el componente
    this.router.navigate(['/private/gestion/mascotas']);
    //Cerramos el dialog para agregar evento
    this.displayAddAnimal = false;

  }

  onSubmitEdit() {
    this.mascotasService.updatePet(this.editAdoptionForm.value, this.animalToEdit.id);
    this.displayEditAnimal = false;
    this.router.navigate(['/private/gestion/mascotas']);
  }

  addPet() {
    this.displayAddAnimal = true;
  }

  editPet(event, element) {
    this.animalToEdit = element;
    this.mascotasService.getPetsById(element.id).subscribe((res) => {
      this.animalRef = res;
      this.editAdoptionForm = this.formBuilder.group({
        edad: [this.animalRef.edad],
        nombre: [this.animalRef.nombre],
        raza: [this.animalRef.raza],
        sexo: [this.animalRef.sexo],
        tipo: [this.animalRef.tipo],
        tipoCaso: [this.animalRef.tipoCaso],
        contacto: [this.animalRef.contacto],
        observaciones: [this.animalRef.observaciones],
        linkCuestionario: [this.animalRef.linkCuestionario],
        etiqueta: [this.animalRef.etiqueta]
      });
    });
    //Se abre el dialog de editar evento
    this.displayEditAnimal = true;
  }

  openDropdown(event, element) {
    event.stopPropagation();
  }

  showDeleteAnimal(event, item) {
    this.animalToDelete = item;
    this.displayDeleteAnimal = true;
  }

  deleteAnimal() {
    this.mascotasService.deletePet(this.animalToDelete);
    this.displayDeleteAnimal = false;
  }

  showFormOfAdoption(event, item) {
    this.animalToEdit = item;
    this.displayFormAdoption = true;
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
    this.displayAddAnimal = newDisplayStepsValue;
    this.displayEditAnimal = newDisplayStepsValue;
  }

}
