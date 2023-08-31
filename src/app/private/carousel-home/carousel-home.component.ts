import { Component, OnInit } from '@angular/core';
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-carousel-home',
  templateUrl: './carousel-home.component.html',
  styleUrls: ['./carousel-home.component.scss']
})
export class CarouselHomeComponent implements OnInit {

  folderName: any
  listOfImages: any;
  displayCarousel: boolean = false;

  constructor(
    private storage: Storage,
  ) { }

  ngOnInit(): void {
    this.folderName = 'carousel'
    this.getImages();
  }

  showCarousel() {
    this.displayCarousel = true;
    this.getImages();
  }

  getImages() {
    const imagesRef = ref(this.storage, this.folderName);
    listAll(imagesRef).then(
      async res => {
        this.listOfImages = [];
        for (let item of res.items) {
          const urlImage = await getDownloadURL(item);
          console.log(urlImage);
          this.listOfImages.push({
            url: urlImage,
            name: item.name
          });
        }
      }).catch(error => console.log(error))
  }

}
