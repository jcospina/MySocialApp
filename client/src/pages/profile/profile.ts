/**
 * Created by juanospina on 19/05/17.
 */
import {Component} from '@angular/core';
import {ToastController, ModalController} from 'ionic-angular';
import {RestClientProvider} from "../../providers/rest-client/rest-client";
import {DataProvider} from '../../providers/data/data';

import {ModalComponent} from '../../components/modal/modal';

import {User} from '../../model/user';
import {Post} from '../../model/post';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  loggedUser: User;
  posts: Post[] = [];
  followers: User[] = [];


  constructor(public dataProvider: DataProvider, public rest: RestClientProvider, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.loggedUser = this.dataProvider.getUser();
    this.getMyPosts();
    this.getFollowers();
  }

  ionViewDidEnter() {
    if (this.rest.needToUpdate) {
      this.posts = [];
      this.followers = [];
      this.getMyPosts();
      this.getFollowers();
      this.rest.needToUpdate = false;
    }
  }

  getMyPosts() {
    this.rest.getMyPosts(this.loggedUser.id).subscribe(
      response => {
        for (var i = 0, len = response.length; i < len; i++) {
          let post = response[i];
          let postObj = Post.createPostFromResponse(post);
          if (postObj.likes.indexOf(this.loggedUser.id) >= 0) {
            postObj.liked = true;
          }
          this.posts.push(postObj);
        }
      }, error => {
        this.showToast("Se produjo un error en el servidor");
      }
    );
  }

  getFollowers() {
    this.rest.getFollowers(this.loggedUser.id).subscribe(
      response => {
        if (response.length > 0) {
          for (var i = 0, len = response.length; i < len; i++) {
            let user = new User(response[i]._id, '', response[i].name, []);
            this.followers.push(user);
          }
        }
      },
      error => {
        this.showToast("Se produjo un error en el servidor");
      }
    );
  }

  deletePost(index: number) {
    let postToDelete = this.posts[index];
    this.rest.deletePost(postToDelete.id).subscribe(
      response => {
        this.rest.needToUpdate = true;
        this.posts.splice(index, 1);
      },
      error => {
        this.showToast("Se produjo un error en el servidor, intenta más tarde");
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

  showModal(users: User[], title, showUnfollowBtn) {
    console.log("Abriendo modal...");
    let modal = this.modalCtrl.create(ModalComponent, {
      users: users,
      title: title,
      unfollowBtn: showUnfollowBtn,
      myId: this.loggedUser.id
    });
    modal.present();
  }

}
