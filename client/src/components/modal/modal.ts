/**
 * Created by juanospina on 19/05/17.
 */

import {Component} from '@angular/core';
import {ToastController, NavParams, ViewController} from 'ionic-angular';
import {RestClientProvider} from "../../providers/rest-client/rest-client";


@Component({
  templateUrl: 'modal.html'
})
export class ModalComponent {

  users: any[];
  title: string;

  empty: boolean = true;
  showUFBtn: boolean = false;
  myId: string;

  constructor(public toastCtrl: ToastController, private params: NavParams, public viewCtrl: ViewController, public rest: RestClientProvider) {
    this.users = this.params.get('users');
    this.myId = this.params.get('myId');
    if (this.users.length > 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
    console.log(this.users);
    this.title = this.params.get('title');
    this.showUFBtn = this.params.get('unfollowBtn');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


  unfollowUser(index: number) {
    let userToUnfollow = this.users[index];
    console.log(userToUnfollow);
    this.rest.unfollowUser(this.myId, userToUnfollow._id).subscribe(
      () => {
        this.rest.needToUpdate = true;
        this.showToast("Dejaste de seguir a " + userToUnfollow.name);
        this.users.splice(index, 1);
      }, () => {
        this.showToast("Se produjo un error, intenta más tarde");
      }
    );
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
