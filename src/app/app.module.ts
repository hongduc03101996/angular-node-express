import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataFormComponent } from './display-user-data-form/display-user-data-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { EditUserDataFormComponent } from './edit-user-data-form/edit-user-data-form.component';
import { InfoDataFormComponent } from './info-data-form/info-data-form.component';
import { Routes, RouterModule } from "@angular/router";

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'register',
    component: InputUserDataFormComponent
  },
  {
    path: 'user/:guid',
    component: DisplayUserDataFormComponent
  },
  {
    path: 'info/:guid',
    component: InfoDataFormComponent
  },
  {
    path: 'edit/:guid',
    component: EditUserDataFormComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InputUserDataFormComponent,
    DisplayUserDataFormComponent,
    LoginFormComponent,
    EditUserDataFormComponent,
    InfoDataFormComponent
  ],
  imports: [
    BrowserModule,
    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }