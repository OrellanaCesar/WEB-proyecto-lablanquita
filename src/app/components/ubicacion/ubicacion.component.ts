import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  prueba:boolean=true;
  scrWidth:any;
  email:string='lablanquita@gmail.com';

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          
          this.scrWidth = window.innerWidth;
          console.log( this.scrWidth);
    }
  constructor() {
    this.getScreenSize();
   }

  ngOnInit(): void {
  }

}
