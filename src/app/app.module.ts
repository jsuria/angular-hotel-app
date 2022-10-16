import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';


// Routes (Lazy-loading)
const appRoutes: Routes = [
    {
      path: '',
      loadChildren: () => import('./pages-module/pages.module').then(m => m.PagesModule)
    },

    {
      path: '**', redirectTo: ''
    }
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,

  ],
  imports: [
    //CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
