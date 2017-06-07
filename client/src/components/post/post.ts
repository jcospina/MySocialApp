import {Component, Input} from '@angular/core';
import {Post} from '../../model/post';
import {RestClientProvider} from "../../providers/rest-client/rest-client";

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {

  @Input('post') post: Post;
  @Input('userId') userId: string;

  constructor(public rest: RestClientProvider) {
  }

  toogleLike() {
    this.post.liked = !this.post.liked;
    if (this.post.liked) {
      this.rest.likePost(this.post.id, this.userId).subscribe(
        () => {
          this.post.likesCount++;
        }, (err) => {
          console.log(err);
        }
      );
    } else {
      this.rest.dislikePost(this.post.id, this.userId).subscribe(
        () => {
          this.post.likesCount--;
        }, (err) => {
          console.log(err);
        }
      );
    }
  }


}
