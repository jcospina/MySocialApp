import { Component } from '@angular/core';

/**
 * Generated class for the PostComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {

  text: string;

  constructor() {
    console.log('Hello PostComponent Component');
    this.text = 'Hello World';
  }

}
