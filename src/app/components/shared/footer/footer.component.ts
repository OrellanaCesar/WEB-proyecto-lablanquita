import { Component, OnInit,HostListener } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	scrWidth:any;
	scrHeight:any;
	@HostListener('window:resize', ['$event'])
	getScreenSize(event?) {
		this.scrHeight = window.innerHeight;
		this.scrWidth = window.innerWidth;
		console.log( this.scrWidth);
		console.log( this.scrHeight);
	}
	constructor() { 
		this.getScreenSize();}

		ngOnInit(): void {
		}

	}
