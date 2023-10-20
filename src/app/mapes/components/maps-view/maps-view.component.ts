import { Component, AfterViewInit, inject, ViewChild, ElementRef } from '@angular/core';
import { MapServiceService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-maps-view',
  templateUrl: './maps-view.component.html',
  styleUrls: ['./maps-view.component.css']
})
export class MapsViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  private placesService = inject(PlacesService);
  private mapService = inject( MapServiceService );

  ngAfterViewInit(): void {

    if( !this.placesService.userLocation ) throw Error('No tenim la teva localització')

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

    const popUp = new Popup()
      .setHTML(`
        <h6>Sóc Aquí</h6>
        <span>Un indret del món</span>
      `)
      new Marker({ color: 'red'})
        .setLngLat( this.placesService.userLocation)
        .setPopup( popUp )
        .addTo( map )
      this.mapService.setMap( map )
  }

}
