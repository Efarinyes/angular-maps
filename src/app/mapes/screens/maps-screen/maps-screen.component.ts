import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-maps-screen',
  templateUrl: './maps-screen.component.html',
  styleUrls: ['./maps-screen.component.css']
})
export class MapsScreenComponent {

  private placesService = inject(PlacesService)

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady
  }




}
