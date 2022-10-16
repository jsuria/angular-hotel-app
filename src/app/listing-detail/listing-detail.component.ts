import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { IHotelListing } from './ihotel-listing';


@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {

  listings : Array<IHotelListing>;

  constructor(private hotelsService:HotelsService) { }

  ngOnInit(): void {
    this.hotelsService.getAllHotels().subscribe(
      (response) => { this.listings = response },
      (error) => { console.log(`Response content issue: ${error}`); }
    )
  }

  trackListingByHotelNo(index, hotelListing){
    return hotelListing[0].hotelBasicInfo.hotelImageUrl;
  }

}
