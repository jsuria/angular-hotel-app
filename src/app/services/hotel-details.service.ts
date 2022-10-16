import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IHotelDetails } from '../app-viewdetail/ihotel-details';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailsService {

    // For parameters, refer to this repository:
    // https://github.com/antoniotajuelo/rakuten-api-documentation/tree/master/RakutenTravel/HotelDetailSearch
    _url = 'https://app.rakuten.co.jp/services/api/Travel/HotelDetailSearch/20170426';

    _params = [
      'applicationId=1076105647355677383',
      'datumType=1',
      'formatVersion=2'
    ];

    constructor(private http:HttpClient) { }

      getHotelDetails(hotelNo: number): Observable<IHotelDetails>{

      return this.http.get(`${this._url}?${this._params.join('&')}&hotelNo=${hotelNo}`).pipe(
        map(data => {

          // We just need the 'hotels' property
          let _hotelDetails = data['hotels'][0][0]['hotelBasicInfo'];

          // TODO: Use Ratings info for later
          //let _hotelRatings = data['hotels'][0][0]['hotelRatingInfo'];

          return _hotelDetails;
        })
    );

    }

}
