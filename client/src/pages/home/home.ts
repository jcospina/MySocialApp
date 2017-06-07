import {Component} from '@angular/core';
import {NavController, ToastController, ModalController} from 'ionic-angular';
import {Post} from '../../model/post';
import {User} from '../../model/user';

import {DataProvider} from '../../providers/data/data';
import {RestClientProvider} from "../../providers/rest-client/rest-client";

import {NewPostModalComponent} from "../../components/newPostModal/newPostModal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  posts: Post[] = [];
  user: User;

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, public rest: RestClientProvider, private toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.user = this.dataProvider.getUser();
    this.getFeed();
  }

  ionViewDidEnter() {
    if (this.rest.needToUpdate) {
      this.getFeed();
      this.rest.needToUpdate = false;
    }
  }

  getFeed() {
    this.posts = [];
    this.rest.getFeed(this.user.id).subscribe(
      response => {
        for (var i = 0, len = response.length; i < len; i++) {
          let post = response[i];
          let postObj = Post.createPostFromResponse(post);
          if (postObj.likes.indexOf(this.user.id) >= 0) {
            postObj.liked = true;
          }
          this.posts.push(postObj);
        }
      }, error => {
        if (error.status == 500) {
          this.showToast("Se produjo un error en el servidor");
        } else {
          this.showToast("Se produjo un error cargando el feed");
        }
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

  newPost() {
    console.log("Abriendo modal...");
    let modal = this.modalCtrl.create(NewPostModalComponent, {
      myId: this.user.id
    });
    modal.onDidDismiss(data => {
      if (data) {
        data.author = this.user.name;
        this.posts.unshift(data);
      }
    });
    modal.present();
  }

  refresh() {
    this.getFeed();
  }


}
