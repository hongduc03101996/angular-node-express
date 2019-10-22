import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from '../models/UserInfoModel'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import {saveAs} from 'file-saver/src/FileSaver';

@Component({
  	selector: 'display-user-data-form',
	templateUrl: './display-user-data-form.component.html',
  	styleUrls: ['./display-user-data-form.component.css']
})

export class DisplayUserDataFormComponent implements OnInit {

	submitted = false;
	serviceErrors:any = {};
	updateForm: FormGroup;
	user: UserInfoModel = new UserInfoModel();
	users = [];  
	success = [false,false,false,false];
	//success = false;
	
  	constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {

	}

  	private subscriber: any;

	ngOnInit() {
		this.subscriber = this.route.params.subscribe(params => {
			this.http.get('/api/v1/customer/' + params.guid).subscribe((data:any) => {

				this.user = new UserInfoModel(data.customer);

				this.user.password = data.password.password;
				
		    });
		});

		this.http.get('/api/v1/customer/').subscribe((data:any) => {

			this.users = data.customers;
			
		});
	}

	editLink() {
		let path = '/edit/' + this.user.guid;
        
        this.router.navigate([path]);
	}

	downloadFile(data: any) {
		const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
		const header = Object.keys(data[0]);
		let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
		csv.unshift(header.join(','));
		let csvArray = csv.join('\r\n');
	
		var blob = new Blob([csvArray], {type: 'text/csv' })
		saveAs(blob, "myFile.csv");
	}

	onExport() {
		this.users.forEach(value => { 
			delete value._id; 
			delete value.__v; 
		});
		this.downloadFile(this.users);
	}
}
