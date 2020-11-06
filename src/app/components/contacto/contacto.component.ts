import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.html',
	styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
	forma: FormGroup;
	error:boolean = false;
	loader:boolean = false;
	email:string = 'limpiezablanquita.contacto@gmail.com';
	scrWidth:any;

	@HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.scrWidth = window.innerWidth;
          console.log( this.scrWidth);
    }
	constructor(private fb:FormBuilder,
		private _mail:EmailService) {
		this.createForm();
		this.getScreenSize();
	}

	ngOnInit(): void {
	}

	createForm(){
		this.forma = this.fb.group({
			nombre:['',Validators.required],
			apellido:['',Validators.required],
			email:['',Validators.required],
			provincia:['',Validators.required],
			comentario:['',Validators.required]
		})
	}

	Send_mails(){
		this.loader = true;
		if( this.forma.invalid){
			this.loader = false;
			return Object.values(this.forma.controls).forEach(control => {
				control.markAsTouched();
			})
		};
		const data = new FormData();
		data.append('nombre',this.forma.get('nombre').value);
		data.append('apellido',this.forma.get('apellido').value);
		data.append('email',this.forma.get('email').value);
		data.append('provincia',this.forma.get('provincia').value);
		data.append('comentario',this.forma.get('comentario').value);
		this._mail.sendMail(data)
		.subscribe((resp:any) =>{
			this.loader = false;
			this.forma.reset({
				nombre:'',
				apellido:'',
				email:'',
				provincia:0,
				comentario:''
			});
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			})
			Toast.fire({
				icon: 'success',
				title: 'Correo Enviado'
			})
		},
		(error:any) =>{
			this.error = true;
			this.loader = false;
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			})
			Toast.fire({
				icon: 'error',
				title: 'Correo no Enviado'
			});
		})

	}


	get nameInvalid(){

		return this.forma.get('nombre').invalid && this.forma.get('nombre').touched ;
	}

	get LastnameInvalid(){

		return this.forma.get('apellido').invalid && this.forma.get('apellido').touched ;
	}

	get emailInvalid(){

		return this.forma.get('email').invalid && this.forma.get('email').touched ;
	}

	get provinciaInvalid(){

		return this.forma.get('provincia').invalid && this.forma.get('provincia').touched ;
	}

}
