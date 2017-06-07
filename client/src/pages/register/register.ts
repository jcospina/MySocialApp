import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ContainerPage} from '../container/container';
import {User} from '../../model/user';

import {RestClientProvider} from "../../providers/rest-client/rest-client";
import {DataProvider} from "../../providers/data/data";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public rest: RestClientProvider,
              public dataProvider: DataProvider, private toastCtrl: ToastController) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let user = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      this.rest.newUser(user).subscribe(
        response => {
          let user = new User(response._id, response.email, response.name, response.following);
          this.dataProvider.setUser(user);
          this.navCtrl.setRoot(ContainerPage);
        }, () => {
          this.showToast("Error en el servidor");
        });
    }
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
