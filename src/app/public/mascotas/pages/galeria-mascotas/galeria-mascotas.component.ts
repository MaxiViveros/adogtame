import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Animal} from 'src/app/core/models/animal.model';
import {MascotasService} from 'src/app/core/services/mascotas.service';
import {getDownloadURL, listAll, ref, Storage} from "@angular/fire/storage";
import {TabView} from 'primeng/tabview';
import {ActivatedRoute} from '@angular/router';
import {SelectItem} from "primeng/api";

export interface Image {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  pet?: Animal;
  cuestionario?: String;
}

@Component({
  selector: 'app-galeria-mascotas',
  templateUrl: './galeria-mascotas.component.html',
  styleUrls: ['./galeria-mascotas.component.scss']
})
export class GaleriaMascotasComponent implements OnInit, AfterViewInit {
  listOfLostPets: Animal[];
  responsiveOptions;
  nameFolderImages: String;
  visible: boolean;
  visible2: boolean;
  listOfImages: Image[];
  listOfImagesPetSelected: any[] = [];
  listOfImagesPetSelected2: any[] = [];
  listOfImagesPetSelectedPerdido: any[] = [];
  listOfImagesPetSelectedPerdido2: any[] = [];
  displayNotaAdopcion: boolean = false;
  displayNotaPerdidas: boolean = false;
  noteSelected: any;
  aIndex: number = 0;
  selectedTabIndex: number = 0;

  //dataview
  listOfPets: Animal[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: any;

  @ViewChild('tabView') tabView!: TabView;

  constructor(
    private mascotasService: MascotasService,
    private storage: Storage,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }
  /*

   */
  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedTabIndex = this.getTabIndex(params['tab']);
      this.cdr.detectChanges();
    });
  }
  /*

   */
  getTabIndex(tabName: string): number {
    // Default tab: 0 when tabName is null or undefined
    if (!tabName) return 0;
    let selectedIndex = this.tabView.tabs.findIndex(
      x => x.header.toLowerCase() === tabName.toLowerCase()
    );
    if (selectedIndex > -1) return selectedIndex;
    // Default tab: 0 when tabName is not exist
    return 0;
  }

  onChange(event) {
    this.selectedTabIndex = event.index;
  }
  /*

   */
  viewDialogNotaAdopcion(event, element) {
    this.displayNotaAdopcion = true;
    this.noteSelected = element
  }
  /*

   */
  viewDialogNotaPerdidas(event, element) {
    this.displayNotaPerdidas = true;
    this.noteSelected = element;
  }
}


