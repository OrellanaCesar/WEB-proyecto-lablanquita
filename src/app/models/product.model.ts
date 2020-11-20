import { BrandModel } from './brand.model';
import { CategoryModel } from './category.model';

export class ProductModel {
	product_id:number;
  // brand_id:number;
  // category:number;
	product_name:string;
  product_description:string;
  product_image:string;
  product_price:number;
  product_offer_day:boolean;
  product_offer_day_order:number;
  product_best_seller:boolean;
  product_best_seller_order:number;
  product_discount_percentage:number;
  product_stock:boolean;
  category:CategoryModel;
  brand:BrandModel;



	constructor(element){
		this.product_id = element.product_id;
    this.product_name = element.product_name;
    this.product_description = element.product_description;
    this.product_image = element.product_image.substring(8);
		this.product_price = element.product_price;
    this.product_offer_day = element.product_offer_day;
    this.product_offer_day_order = element.product_offer_day_order;
    this.product_best_seller = element.product_best_seller;
    this.product_best_seller_order = element.product_best_seller_order;
    this.product_discount_percentage = element.product_discount_percentage;
    this.product_stock = element.product_stock;
    this.category =  new CategoryModel(element.category);
    this.brand = new BrandModel(element.brand);


	}
}
