import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Importacion de modelo
import {Articulo} from 'src/app/core/models/articulo';

//Importacion del servicio
import { EducacionService } from 'src/app/core/services/educacion.service';

import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-crud-educacion-show',
  templateUrl: './crud-educacion-show.component.html',
  styleUrls: ['./crud-educacion-show.component.scss']
})

export class CrudEducacionShowComponent implements OnInit {
  articlesList: Articulo[];
  educacionForm: FormGroup;
  editForm: FormGroup;
  postRef: any;
  articleToEdit: any;
  displayAddEvent: boolean = false;
  displayEditArticle: boolean = false;
  loading: boolean;
  displayAddArticle: boolean = false;
  displayDeleteArticle: boolean = false;

  constructor(
    private educacionService: EducacionService,
    public formBuilder: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute
    ) {
      this.educacionForm = this.formBuilder.group({
        id: [''],
        titulo: [''],
        descripcion: [''],
        etiqueta: [''],
        fechaCreacion: [''],
        fuente: ['']
      })
      this.editForm = this.formBuilder.group({
        id: [''],
        titulo: [''],
        descripcion: [''],
        etiqueta: [''],
        fechaCreacion: [''],
        fuente: ['']
      })
  }

  ngOnInit(): void {
    this.educacionService.getPosts().subscribe((res) =>{
      this.articlesList = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Articulo)
        }
      })
      console.log(this.articlesList);
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
  deleteRow = (educacion) => this.educacionService.deletePost(educacion);

  addArticle() {
    //Abrimos el dialog para crear el evento
    this.displayAddArticle = true;
  }

  editArticle(event, element) {
    this.articleToEdit = element;
    this.educacionService.getPostById(element.id).subscribe(res =>{
      this.postRef = res
      this.editForm = this.formBuilder.group({
        titulo: [this.postRef.titulo],
        descripcion: [this.postRef.descripcion],
        etiqueta: [this.postRef.etiqueta],
        fechaCreacion: [this.postRef.fechaCreacion],
        fuente: [this.postRef.fuente]
      });

    })
    this.displayEditArticle = true;
  }

  showDeleteArticle(event, rowData) {

  }

  showFormOfArticle(event, rowData) {

  }

  deleteArticle() {

  }

  changeDisplaySteps(newDisplayStepsValue: boolean) {
    this.displayAddArticle = newDisplayStepsValue;
    this.displayEditArticle = newDisplayStepsValue;
  }

}
