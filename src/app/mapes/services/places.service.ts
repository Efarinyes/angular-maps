
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapServiceService } from './map-service.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [ number, number ];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];




  get isUserLocationReady(): boolean {
    return !!this.userLocation
  }
  private placesApi = inject( PlacesApiClient );
  private mapService = inject( MapServiceService );


  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( ( resolve, reject ) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
        },
        (err ) => {
          alert('No podem determinar la teva localització');
          console.log(err)
          reject();
        }
      );
    });
  }

  getPlacesByQuery( query: string = '' ) {
    // TODO: evaluar si la petició es buida
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation ) throw Error( 'No sabem la proximitat del clcient')

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      } )
  }

  deletePlaces() {
    this.places = []
  }

}
