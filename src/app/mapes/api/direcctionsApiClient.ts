
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { enviroment } from "src/enviroments/enviroments";


@Injectable({
  providedIn: 'root'

})

export class DirecctionsApiClient extends HttpClient {
  public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving'

  constructor( handler: HttpHandler) {

    super( handler )
  }

  public override get<T>( url: string)  {


    url = this.baseUrl + url

    return super.get<T>( url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: enviroment.apiKey,
      }
    })

  }

}
