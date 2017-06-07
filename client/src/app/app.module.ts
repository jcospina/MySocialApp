import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import * as moment from 'moment';
import {MomentModule} from 'angular2-moment';
moment.locale('es');


import {MyApp} from './app.component';
import {ContainerPage} from '../pages/container/container';
import {HomePage} from '../pages/home/home';
import {UsersPage} from '../pages/users/users';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {ProfilePage} from '../pages/profile/profile';
import {PostComponent} from '../components/post/post';
import {RestClientProvider} from '../providers/rest-client/rest-client';
import {DataProvider} from '../providers/data/data';
import {UserComponent} from '../components/user/user';
import {ModalComponent} from '../components/modal/modal'
import {NewPostModalComponent} from '../components/newPostModal/newPostModal'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PostComponent,
    ContainerPage,
    UsersPage,
    UserComponent,
    ProfilePage,
    ModalComponent,
    NewPostModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          // These options are available in ionic-angular@2.0.0-beta.2 and up.
          scrollAssist: false,    // Valid options appear to be [true, false]
          autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
        },
        android: {
          scrollAssist: false,   // Valid options appear to be [true, false]
          autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ContainerPage,
    UsersPage,
    ProfilePage,
    ModalComponent,
    NewPostModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestClientProvider,
    DataProvider
  ]
})
export class AppModule {
}
