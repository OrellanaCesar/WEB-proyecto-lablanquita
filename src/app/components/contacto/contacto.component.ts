import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.html',
	styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
	email:string = 'pablofacundoorellana@gmail.com';
	form: FormGroup;
	error:boolean = false;
	loader:boolean = false;
	constructor(private fb:FormBuilder,
		private _mail:EmailService) { }

	ngOnInit(): void {
	}

	createForm(){
		this.form = this.fb.group({
			nombre:['',Validators.required],
			apellido:['',Validators.required],
			email:['',Validators.required],
			provincia:['',Validators.required],
			comentario:['',Validators.required]
		})
	}

	Send(){
		this.loader = true;
		const data = new FormData();
		data.append('nombre',this.form.get('nombre').value);
		data.append('apellido',this.form.get('apellido').value);
		data.append('email',this.form.get('email').value);
		data.append('provincia',this.form.get('provincia').value);
		data.append('comentario',this.form.get('comentario').value);
		this._mail.sendMail(data)
		.subscribe((resp:any) =>{
			this.loader = false;
			this.form.reset({
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
				title: error.error.message
			});
		})

	}

}
