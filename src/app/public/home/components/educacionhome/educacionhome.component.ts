import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Importacion de modelo
import { Articulo } from 'src/app/core/models/articulo';

//Importacion del servicio
import { EducacionService } from 'src/app/core/services/educacion.service';
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-educacionhome',
  templateUrl: './educacionhome.component.html',
  styleUrls: ['./educacionhome.component.scss']
})
export class EducacionhomeComponent implements OnInit {

  articlesList: Articulo[];
  loading: boolean;
  displayArticle: boolean = false;
  articleSelected: any;

  constructor(
    private educacionService: EducacionService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.educacionService.getPosts().subscribe((res) =>{
      this.articlesList = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Articulo)
        }
      });
      console.log(this.articlesList);
      this.getImageArticle();
    });
  }

  showArticle(article) {
    this.articleSelected = article;
    this.displayArticle = true;
  }

  getImageArticle() {
    this.articlesList.forEach((article) => {
      const imagesRef =  ref(this.storage, 'articulos'+`/${article.titulo}`+`_`+`${article.id}`)
      listAll(imagesRef).then(
        async res => {
          for (let item of res.items) {
            const idImage = item.name.split('_');
            if (idImage[0] === article.id) {
              article.urlImage = await getDownloadURL(item)
              break;
            }
          }
          this.loading = false;
        }).catch(error => console.log(error))
    })
  }

}
