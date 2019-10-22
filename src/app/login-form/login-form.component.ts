import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	submitted = false;
  loginForm: FormGroup;
  serviceErrors:any = {};
  err: '';
  invalidEmail = '';
  invalidPassword = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { 

  }

  requiredEmail() {
  	return (this.submitted && (this.serviceErrors.email != null || this.loginForm.controls.email.errors != null));
  }

  requiredPassword() {
  	return (this.submitted && (this.serviceErrors.password != null || this.loginForm.controls.password.errors != null));
  }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
  		email: ['', [Validators.required]],
  		password: ['', [Validators.required]],
    });
    
    
  }

  private subscriber: any;

  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
      
    let data: any = Object.assign(this.loginForm.value);

    this.http.post('/api/v1/customer/login', data).subscribe((data:any) => {
      if (data.err) {
        if (data.err == 'Invalid email') {
          this.invalidEmail = data.err;
          this.invalidPassword = '';
          this.err = '';
        }
        else if (data.err == 'Invalid password') {
          this.invalidPassword = data.err;
          this.invalidEmail = '';
          this.err = '';
        }
        else {
          this.err = data.err;
          this.invalidEmail = '';
          this.invalidPassword = '';
        }
      }
      else if (data.result) {
        let path = '/user/' + data.result;
        
        this.router.navigate([path]);
      }
      
    }, error =>
    {
      this.serviceErrors = error.error.error;
    });
  }

}
