import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { BrandModel } from 'src/app/models/brand.model';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-create-brand',
	templateUrl: './create-brand.component.html',
	styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
	form:FormGroup;
	loader:boolean = false;
	error:boolean = false;

	constructor(private router:Router,
		private fb:FormBuilder,
		private _brand:BrandService) { 
		this.createForm();
	}

	ngOnInit(): void {
	}

	createForm(){
		this.form = this.fb.group({
			brand_name:['',Validators.required]
		})
	}

	goGrid(){
		this.router.navigateByUrl('dashboardBrands');
	}

	

}
