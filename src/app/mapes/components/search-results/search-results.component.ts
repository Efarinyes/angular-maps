import { Component, inject } from '@angular/core';
import { MapServiceService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  private placesService = inject( PlacesService );
  private mapService = inject( MapServiceService );

  public selectedId: string = ''

  get isLoadingPlaces(): boolean {
   return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places
  }

  flyTo( place: Feature ) {
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getRoute( place: Feature ) {

    if (!this.placesService.userLocation) throw Error('No sabem el punt inicial');

    this.placesService.deletePlaces();

    const start = this.placesService.userLocation;
    const end = place.center as [ number, number ];

    this.mapService.getRouteBetweenPoints(start, end)
  }

}
