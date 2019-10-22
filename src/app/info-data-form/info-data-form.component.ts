import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/UserInfoModel'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-data-form',
  templateUrl: './info-data-form.component.html',
  styleUrls: ['./info-data-form.component.css']
})
export class InfoDataFormComponent implements OnInit {

  submitted = false;
	serviceErrors:any = {};
	updateForm: FormGroup;
  user: UserInfoModel = new UserInfoModel();
	
  	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

  }
  
  private subscriber: any;

	ngOnInit() {
		this.subscriber = this.route.params.subscribe(params => {
			this.http.get('/api/v1/customer/' + params.guid).subscribe((data:any) => {

				this.user = new UserInfoModel(data.customer);

				let avatar: HTMLImageElement = <HTMLImageElement> document.getElementById('avatar_img');
				
				if (this.imgURL) {
					avatar.src = this.imgURL;
				}
				else {
					
				}

				
		  });
		});
	}

	imgURL: any;

  onBack() {
    
    
	}
}
