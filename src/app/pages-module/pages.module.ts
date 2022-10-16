import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GoogleMapsModule } from '@angular/google-maps';

import { AppViewdetailComponent } from '../app-viewdetail/app-viewdetail.component';
import { ListingDetailComponent } from '../listing-detail/listing-detail.component';
import { UiCarouselComponent } from '../ui-carousel/ui-carousel.component';

import { HotelsService } from '../services/hotels.service';
import { CategoriesService } from '../services/categories.service';
import { GoogleMapService } from '../services/google-map.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppViewdetailComponent,   // <-- GoogleMaps will be used here
    ListingDetailComponent,
    UiCarouselComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forChild([
      {
          path: '',
          component: ListingDetailComponent
      },
      {
          path: 'view-details/:hotelNumber',
          component: AppViewdetailComponent
      },
      {
          path: 'view-details',
          redirectTo: ''
      }
    ])
  ],
  exports:[
    RouterModule   // <-- Exporting this one for parent route to see
  ],
  providers:[
    CategoriesService,
    HotelsService,
    GoogleMapService
  ]
})
export class PagesModule { }
