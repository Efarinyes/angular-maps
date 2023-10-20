import { Component, inject } from '@angular/core';
import { MapServiceService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  private placesService = inject( PlacesService )
  private mapService = inject( MapServiceService );

  goToMyLocation() {

    if (!this.placesService.isUserLocationReady) throw Error('No tenim la ubicació inicial');
    if (!this.mapService.isMapReady ) throw Error('El mapa no esta inicialitzat');

    this.mapService.flyTo( this.placesService.userLocation!);
  }

}
