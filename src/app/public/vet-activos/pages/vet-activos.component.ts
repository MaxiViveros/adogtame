import { Component, OnInit } from '@angular/core';
import {Veterinaria} from "../../../private/veterinarias/veterinarias.component";
import {VeterinariasService} from "../../../core/services/veterinarias.service";
import {Router} from "@angular/router";
import {Storage} from "@angular/fire/storage";

@Component({
  selector: 'app-vet-activos',
  templateUrl: './vet-activos.component.html',
  styleUrls: ['./vet-activos.component.scss']
})
export class VetActivosComponent implements OnInit {

  loading: boolean;
  listVets: Veterinaria[];

  constructor(
    private veterinariasService: VeterinariasService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.loading = true;
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

  clickWeb(link) {
    window.location.href = link;
  }

}
