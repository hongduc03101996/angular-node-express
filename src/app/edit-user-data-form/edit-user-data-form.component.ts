import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/UserInfoModel'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'edit-user-data-form',
  templateUrl: './edit-user-data-form.component.html',
  styleUrls: ['./edit-user-data-form.component.css']
})
export class EditUserDataFormComponent implements OnInit {

  	submitted = false;
	serviceErrors:any = {};
	updateForm: FormGroup;
  	user: UserInfoModel = new UserInfoModel();
	success = [false,false,false,false];
	url: any;
	//success = false;
	
  	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
		this.updateForm = new FormGroup({
			first_name: new FormControl(),
			last_name: new FormControl(),
			zipcode: new FormControl(),
			password: new FormControl()
		});
	}

	invalidFirstName() {
		return (this.submitted && (this.serviceErrors.first_name != null || this.updateForm.controls.first_name.errors != null));
	}
  
	invalidLastName() {
		return (this.submitted && (this.serviceErrors.last_name != null || this.updateForm.controls.last_name.errors != null));
	}
  
	invalidZipcode() {
		return (this.submitted && (this.serviceErrors.zipcode != null || this.updateForm.controls.zipcode.errors != null));
	}

	invalidPassword = false;

  	private subscriber: any;

	ngOnInit() {
		this.url = this.router.url;
		this.subscriber = this.route.params.subscribe(params => {
			this.http.get('/api/v1/customer/' + params.guid).subscribe((data:any) => {

				this.user = new UserInfoModel(data.customer);

				this.user.password = data.password.password;
				let avatar: HTMLImageElement = <HTMLImageElement> document.getElementById('avatar_img');
				
				if (this.imgURL) {
					avatar.src = this.imgURL;
				}
				else {
					
				}

				this.updateForm = this.formBuilder.group({
					first_name: [this.user.first_name, [Validators.required, Validators.maxLength(50)]],
					last_name: [this.user.last_name, [Validators.required, Validators.maxLength(50)]],
					zipcode: [this.user.zipcode, [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
					password: [this.user.password] 
				});
		    });
		});
	}

	public imagePath;
	imgURL: any;
	public message: string;

	readURL(files) {
		if (files.length === 0)
		return;
	
		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			this.message = "Only images are supported.";
			return;
		}
	
		var reader = new FileReader();
		this.imagePath = files;
		reader.readAsDataURL(files[0]); 
		reader.onload = (_event) => { 
			this.imgURL = reader.result; 
		}
	}

	onImgClick() {
		let ip: HTMLInputElement = <HTMLInputElement> document.getElementById('avatar_input');
		ip.click();
	}

	onTextFocus() {
		this.success.forEach((item,index) =>  {
			this.success[index] = false;
		});
		//this.success = false;
	}

	onPassFocus() {
		this.success.forEach((item,index) =>  {
			this.success[index] = false;
		});
		let ip: HTMLInputElement = <HTMLInputElement> document.getElementById('password');
		if (ip.value == this.user.password) {
			ip.value =  '';
		}
	}

	onPassFocusOut() {
		let ip: HTMLInputElement = <HTMLInputElement> document.getElementById('password');
		if (ip.value == '') {
			ip.value =  this.user.password;
		}
	}

	onChange() {
		let ip: HTMLInputElement = <HTMLInputElement> document.getElementById('password');
		if(ip.value.length >= 5 &&  ip.value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')) {
			this.invalidPassword = false;
		}
		else {
			this.invalidPassword = true;
		}
	}

	onSubmit() {
		this.submitted = true;

		if(this.updateForm.invalid == true)	{
			return;
		}
		
		let form_data: any = Object.assign(this.updateForm.value);

		if(form_data.password != this.user.password) {
			if(form_data.password.length >= 5 &&  form_data.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')) {
				this.http.put('/api/v1/customer/password/' + this.user.guid, form_data).subscribe((data:any) => {
					if (data.err) {
						this.success.forEach((item,index) =>  {
							this.success[index] = false;
						});
						//this.success = false;
					}
					else {
						this.success[3] = (form_data.password != this.user.password);
						this.ngOnInit();
						//this.success = true;
					}
				}, error =>	{
					this.serviceErrors = error.error.error;
				});
			}
			else {
				this.invalidPassword = true;
				return;
			}
		}

		if(form_data.first_name != this.user.first_name || form_data.last_name != this.user.last_name || form_data.zipcode != this.user.zipcode) {
			this.http.put('/api/v1/customer/' + this.user.guid, form_data).subscribe((data:any) => {
				if (data.err) {
					this.success.forEach((item,index) =>  {
						this.success[index] = false;
					});
					//this.success = false;
				}
				else {
					this.success[0] = (form_data.first_name != this.user.first_name);
					this.success[1] = (form_data.last_name != this.user.last_name); 
					this.success[2] = (form_data.zipcode != this.user.zipcode);
					this.ngOnInit();
					//this.success = true;
				}
			}, error =>	{
				this.serviceErrors = error.error.error;
			});
		}
  }

  onBack() {
		let path = '/user/' + this.user.guid;
        
        this.router.navigate([path]);
	}
}