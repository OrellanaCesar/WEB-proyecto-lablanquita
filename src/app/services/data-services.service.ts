import { Injectable } from '@angular/core';
import { BrandModel } from '../models/brand.model';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  listBrands : BrandModel [] = [];
  listCategories : CategoryModel[] = [];
  
  constructor() { }
}
