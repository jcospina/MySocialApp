import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostComponent } from './post';

@NgModule({
  declarations: [
    PostComponent,
  ],
  imports: [
    IonicPageModule.forChild(PostComponent),
  ],
  exports: [
    PostComponent
  ]
})
export class PostComponentModule {}
