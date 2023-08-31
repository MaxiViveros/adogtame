import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-steps-carousel-home',
  templateUrl: './steps-carousel-home.component.html',
  styleUrls: ['./steps-carousel-home.component.scss']
})
export class StepsCarouselHomeComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 0
  @Input() folderName: any
  @Input() listOfImages: any[]
  isUpload: boolean;
  displayNotUploadImages: boolean = false;

  constructor(
    private storage: Storage,
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Subir imagenes',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Vista Previa',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
    ];
  }

  isUploadFiles(upload: boolean) {
    this.isUpload = upload;
  }

  nextPageImages() {
    if (!this.isUpload) {
      this.displayNotUploadImages = true;
    }
    else {
      this.getImages();
    }
  }

  getImages() {
    const imagesRef = ref(this.storage, this.folderName);
    listAll(imagesRef).then(
      async res => {
        this.listOfImages = [];
        for (let item of res.items) {
          const urlImage = await getDownloadURL(item);
          this.listOfImages.push({
            url: urlImage,
            name: item.name
          });
        }
        this.activeIndex += 1;
      }).catch(error => console.log(error))
  }

  backPage() {
    this.activeIndex -= 1;
    if (this.activeIndex < 0) {
      this.activeIndex = 0;
    }
  }

  continueAnyway() {
    this.displayNotUploadImages = false;
    this.getImages();
  }

  notContinue() {
    this.displayNotUploadImages = false;
  }

}
