/**
 * Created by juanospina on 22/05/17.
 */
import {Component} from '@angular/core';
import {ToastController, NavParams, ViewController} from 'ionic-angular';
import {RestClientProvider} from "../../providers/rest-client/rest-client";

import {Post} from '../../model/post';


@Component({
  selector: 'newPost',
  templateUrl: 'newPostModal.html'
})
export class NewPostModalComponent {

  myId: string;
  text: string;
  myPost: Post;

  constructor(public toastCtrl: ToastController, private params: NavParams, public viewCtrl: ViewController, public rest: RestClientProvider) {
    this.myId = this.params.get('myId');
  }

  closeModal() {
    if (this.myPost) {
      this.viewCtrl.dismiss(this.myPost);
    } else {
      this.viewCtrl.dismiss();
    }
  }

  sendPost() {
    let post = new Post();
    post.author = this.myId;
    post.date = new Date();
    post.text = this.text;
    this.rest.newPost(post).subscribe(
      (createdPost) => {
        this.rest.needToUpdate = true;
        this.myPost = Post.createPostFromResponse(createdPost);
        this.closeModal();
        this.showToast("Mensaje publicado");
      },
      () => {
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
