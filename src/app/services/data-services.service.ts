import { Injectable } from '@angular/core';
import { BrandModel } from '../models/brand.model';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import {UserModel} from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  listBrands : BrandModel [] = [];
  listCategories : CategoryModel[] = [];
  searchProducts : ProductModel[] = [];
  listUsers : UserModel[] = [];
  constructor() { }
}
