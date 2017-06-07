import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ContainerPage} from '../container/container';
import {RegisterPage} from '../register/register';
import {User} from "../../model/user";

import {RestClientProvider} from "../../providers/rest-client/rest-client";
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              private toastCtrl: ToastController, public rest: RestClientProvider,
              public dataProvider: DataProvider) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    if (this.loginForm.valid) {
      this.rest.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        response => {
          let user = new User(response._id, response.email, response.name, response.following);
          this.dataProvider.setUser(user);
          this.navCtrl.setRoot(ContainerPage);
        }, error => {
          if (error.status == 400) {
            this.showToast("Usuario o contraseña incorrectos");
          } else {
            this.showToast("Error en el servidor");
          }
        }
      );
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
