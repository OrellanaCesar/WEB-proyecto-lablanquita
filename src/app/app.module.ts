import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { DataTableBrandComponent } from './components/brands/data-table-brand/data-table-brand.component';
import { CreateBrandComponent } from './components/brands/create-brand/create-brand.component';
import { DataTableCategoryComponent } from './components/categories/data-table-category/data-table-category.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';


@NgModule({
  declarations: [
  AppComponent,
  MenuComponent,
  HomeComponent,
  UbicacionComponent,
  DataTableBrandComponent,
  CreateBrandComponent,
  DataTableCategoryComponent,
  CreateCategoryComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  DataTablesModule,
  HttpClientModule,
  ReactiveFormsModule,
  CarouselModule,
  BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
