import { Component, OnInit,Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ApiSettigns } from 'src/app/API/API.settings';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {

  @Input() product:ProductModel;
  url = ApiSettigns.url_image;
  constructor() {


  }

  ngOnInit(): void {
  }

}
