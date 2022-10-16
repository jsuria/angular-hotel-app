import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapService } from '../services/google-map.service';
import { HotelsService } from '../services/hotels.service';
import { IHotelDetails } from './ihotel-details';

@Component({
  selector: 'app-viewdetail',
  templateUrl: './app-viewdetail.component.html',
  styleUrls: ['./app-viewdetail.component.css']
})


export class AppViewdetailComponent implements OnInit {

  // Overlay for the label containing text info on the marker
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  details: IHotelDetails;
  mapLoaded: Boolean;

  mapCenter: google.maps.LatLngLiteral;
  // 21 is heighest (furthest up)
  mapZoom: 4;

  // For marking the center only
  mapMarkerOptions: google.maps.MarkerOptions = {draggable: false};
  mapMarkerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    private hotelsService: HotelsService,
    private googleMapService: GoogleMapService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      // Get parameter for hotel code
      // Hotel number
      //const _hotelNumber: number = 0;

      const _hotelNumber: number = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('hotelNumber'));

      // Hotel details
      this.hotelsService.getHotel(_hotelNumber).subscribe(
          (response) => {
              this.details = response;
              //console.log(response);

              console.log(`Getting coordinates... [${response.latitude}, ${response.longitude}]`);
              this.loadMap(response.latitude, response.longitude);
          },
          (error) => {
              console.log(`Response content issue: ${error}`);
          }
      );
  }

  loadMap(latitude: number, longitude: number){

      console.log("Loading map...");

      this.googleMapService.activateMap().subscribe(
          (response) => {

              //this.mapOptions.center

              this.mapCenter = {
                lat: latitude,
                lng: longitude
              };

              this.mapMarkerPositions.push(this.mapCenter);

              this.mapLoaded = response;

              console.log(`Map response: ${response}`);

          }
      );
  }

  openInfoWindow(mapMarker: MapMarker){
      this.infoWindow.open(mapMarker);
  }

  get hotelImage() {
      return (
          this.details && this.details.hotelImageUrl &&
          this.isValidEntry(this.details.hotelImageUrl))
          ? this.details.hotelImageUrl : null;
  }

  get hotelName() {
      return (
          this.details && this.details.hotelName &&
          this.isValidEntry(this.details.hotelName))
          ? this.details.hotelName.trim() : null;
  }

  get hotelSpecial() {
      return (
          this.details && this.details.hotelSpecial &&
          this.isValidEntry(this.details.hotelSpecial))
          ? this.details.hotelSpecial.trim() : "No specials available";
  }

  get hotelPhone() {
      return (
          this.details && this.details.telephoneNo &&
          this.isValidEntry(this.details.telephoneNo))
          ? this.details.telephoneNo.trim() : null;
  }

  get hotelFax() {
      return (
          this.details && this.details.faxNo &&
          this.isValidEntry(this.details.faxNo))
          ? this.details.faxNo.trim() : null;
  }

  get hotelParking() {
      return (
          this.details && this.details.parkingInformation &&
          this.isValidEntry(this.details.parkingInformation))
          ? this.details.parkingInformation.trim() : null;
  }

  get hotelNearestStation() {
      return (
          this.details && this.details.nearestStation &&
          this.isValidEntry(this.details.nearestStation))
          ? this.details.nearestStation.trim() : null;
  }

  get hotelAccess() {
      return (
          this.details && this.details.access &&
          this.isValidEntry(this.details.access))
          ? this.details.access.trim() : null;
  }

  get hotelCompleteAddress() {
      return (
          this.details &&
          (this.details.address1 || this.details.address2 || this.details.postalCode))
          ? `${this.details.address1}, ${this.details.address1} ${this.details.postalCode} ` : null;
  }

  get hotelMapLatitude() {
      return (this.details && this.details.latitude) ?  this.details.latitude : null;
  }

  get hotelMapLongitude() {
      return (this.details && this.details.longitude) ?  this.details.longitude : null;
  }

  get hotelWebpage() {
      return (this.details && this.details.hotelInformationUrl) ? this.details.hotelInformationUrl : '#';
  }

  // Values
  isValidEntry(entry: String): Boolean {
      return entry.trim() != '';
  }

  // Use carouse for multiple photos
  hasMultiplePhotos(detail: IHotelDetails){
      return (detail.hotelImageUrl && detail.hotelThumbnailUrl);
  }

}
