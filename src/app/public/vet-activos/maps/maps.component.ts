import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  options: any;

    overlays: any[];

    dialogVisible: boolean;

    markerTitle: string;

    selectedPosition: any;

    infoWindow: any;

    draggable: boolean;

    constructor() {}

    ngOnInit() {
        this.options = {
            center: {lat: -34.9833, lng: -71.2333},
            zoom: 14
        };

        this.initOverlays();

        //this.infoWindow = new google.maps.InfoWindow();
    }

    handleMapClick(event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    }

    handleOverlayClick(event) {
        let isMarker = event.overlay.getTitle != undefined;

        if (isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            // this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
        }
        else {
            // this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
        }
    }

    addMarker() {
        this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
        this.markerTitle = null;
        this.dialogVisible = false;
    }

    handleDragEnd(event) {
      //this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
    }

    initOverlays() {
        if (!this.overlays||!this.overlays.length) {
            this.overlays = [
                new google.maps.Marker({position: {lat: -34.9689908430086, lng: -71.23034940444612}, title:"Veterinaria Tecnovet"}),
                new google.maps.Marker({position: {lat: -34.994471986836224, lng: -71.24985678909947}, title:"Clinica Veterinaria Agustina"}),
                new google.maps.Marker({position: {lat: -34.97022137047556, lng: -71.23315924491823}, title:"Clinica Veterinaria Santa Barbara"}),
                new google.maps.Marker({position: {lat: -34.9784400449805, lng: -71.25152302957234}, title:"Veterinaria Encina"}),
                new google.maps.Marker({position: {lat: -34.9727910998839, lng: -71.21075584306331}, title:"Veterinaria Francal"}),
                new google.maps.Polygon({paths: [ 
                    {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
                ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
                new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
            ];
        }
    }

    zoomIn(map) {
        map.setZoom(map.getZoom()+1);
    }

    zoomOut(map) {
        map.setZoom(map.getZoom()-1);
    }

    clear() {
        this.overlays = [];
    }
}
