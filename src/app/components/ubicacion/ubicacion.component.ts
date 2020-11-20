import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  prueba:boolean=true;
  scrWidth:any;
  scrHeight:any;
  email:string='limpiezablanquita.contacto@gmail.com';

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.scrHeight = window.innerHeight;
          this.scrWidth = window.innerWidth;

    }
  constructor() {
    this.getScreenSize();
   }

  ngOnInit(): void {
  }

}
