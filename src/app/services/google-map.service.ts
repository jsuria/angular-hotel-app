import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor(private httpClient: HttpClient) { }

  activateMap(): Observable<Boolean> {

      return this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAg7HhxHtMxliY8qh_vK-3PgpVyaI8auyM', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

  }

}

