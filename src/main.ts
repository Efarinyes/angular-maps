import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl';
import { enviroment } from './enviroments/enviroments';

if( !navigator.geolocation ) {
  alert('EL navegador no suporta la geolocalització')
  throw new Error('EL navegador no suporta la geolocalització')
}

Mapboxgl.accessToken = enviroment.apiKey;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
