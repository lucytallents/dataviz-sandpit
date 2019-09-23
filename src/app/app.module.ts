import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { HomeComponent } from './views/home/home.component'
import { DcExampleComponent } from './views/dc-example/dc-example.component';
import { LoadcsvComponent } from './views/loadcsv/loadcsv.component';

import { GeoBubbleComponent } from './comps/geo-bubble/geo-bubble.component';
import { ForceBubbleComponent } from './comps/force-bubble/force-bubble.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DcExampleComponent,
    LoadcsvComponent,
    GeoBubbleComponent,
    ForceBubbleComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
