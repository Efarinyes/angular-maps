import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;
  private placesService = inject(PlacesService)

  onQueryChanged( query: string = '' ) {

    if( this.debounceTimer ) clearTimeout( this.debounceTimer)

    this.debounceTimer = setTimeout( () => {
     // console.log('Envia aquesta peticio: ', query )
      this.placesService.getPlacesByQuery(query)
    }, 750)

  }

}
