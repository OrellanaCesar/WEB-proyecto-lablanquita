import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { DataTableBrandComponent } from './components/brands/data-table-brand/data-table-brand.component';
import { CreateBrandComponent } from './components/brands/create-brand/create-brand.component';

@NgModule({
  declarations: [
  AppComponent,
  MenuComponent,
  HomeComponent,
  UbicacionComponent,
  DataTableBrandComponent,
  CreateBrandComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
