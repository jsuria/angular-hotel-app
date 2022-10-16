import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IHotelListing } from '../listing-detail/ihotel-listing';
import { Observable } from 'rxjs';
import { IHotelDetails } from '../app-viewdetail/ihotel-details';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

    // For parameters, refer to this repository:
    // https://github.com/antoniotajuelo/rakuten-api-documentation/tree/master/RakutenTravel/
    //_url = 'https://app.rakuten.co.jp/services/api/Travel/KeywordHotelSearch/20170426';

    _url = 'https://app.rakuten.co.jp/services/api/Travel';

    _fields = [
      'hotelImageUrl',
      'hotelInformationUrl',
      'hotelName',
      'hotelNo',
      'telephoneNo',
      'faxNo',
      'address1',
      'address2',
      'latitude',
      'longitude'
    ]

    _params = [
      'applicationId=1076105647355677383',
      'datumType=1',
      'formatVersion=2'
    ];

    constructor(private http:HttpClient) { }

    // Returns an observable
    getAllHotels(): Observable<IHotelListing[]>{
        this._params.push('keyword=japan');
        this._params.push(`elements=${this._fields.join()}`);
        this._url += '/KeywordHotelSearch/20170426';

        // Pipe and map the response into a container array
        return this.http.get(`${this._url}?${this._params.join('&')}`).pipe(
            map(data => {

              // For the records that we dump later
              const hotelsArray: Array<IHotelListing> = [];

              // We just need the 'hotels' property
              let _hotels = data['hotels'];

              // TODO: Process pagination later
              // let _pagination = data['pagination'];

              /**/
              for(const prop in _hotels){
                  if(_hotels.hasOwnProperty(prop)) {
                      hotelsArray.push(_hotels[prop]);
                  }
              } /**/

              return hotelsArray;
            })
        );
    }

    getHotel(hotelNo: number):  Observable<IHotelDetails> {

        this._url += '/HotelDetailSearch/20170426';

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
