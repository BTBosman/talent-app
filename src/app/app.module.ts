import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';
import {Camera} from '@ionic-native/camera'
import { LoginPage } from '../pages/login/login';
import { SecondPage } from '../pages/second/second';
import { RegisterPage } from '../pages/register/register';
import { ArtistPage } from '../pages/artist/artist';
import { UserPage } from '../pages/user/user';
import { RecruiterPage } from '../pages/recruiter/recruiter';
import { LogoutPage } from '../pages/logout/logout';
import { ProfilePage } from '../pages/profile/profile';
import { UsersPage } from '../pages/users/users';
import { ScoutPage } from '../pages/scout/scout';
import {CommentsPage } from '../pages/comments/comments'

import { ArtistProfilePage } from '../pages/artist-profile/artist-profile';
import { ArtisthomePage } from '../pages/artisthome/artisthome';
import { ArtistProfileUpdatePage } from '../pages/artist-profile-update/artist-profile-update';
import { ScoutProfileUpdatePage } from '../pages/scout-profile-update/scout-profile-update';
import { ScouteProfilePage } from '../pages/scoute-profile/scoute-profile';

import { DisplayPage } from '../pages/display/display';
import { UploadPreviewPage } from '../pages/upload-preview/upload-preview';
import {MessagePage } from '../pages/message/message'
import { SeeMessagesPage } from '../pages/see-messages/see-messages'
import { GalleryPage } from '../pages/gallery/gallery';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SecondPage,
    RegisterPage,
    RecruiterPage,
    SeeMessagesPage,
    UserPage,
    ArtistPage,
    CommentsPage ,
    LogoutPage,
    ProfilePage,
    ArtisthomePage,
    ScoutPage,
    UsersPage,
    MessagePage ,
    ArtistProfilePage,
    ArtistProfileUpdatePage,
    ScoutProfileUpdatePage,
    ScouteProfilePage,
    GalleryPage,
    UploadPreviewPage, 
    DisplayPage
],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SecondPage,
    MessagePage ,
    CommentsPage ,
    SeeMessagesPage,
    RegisterPage,
    RecruiterPage,
    UserPage,
    ArtistPage,
    LogoutPage,
    ProfilePage,
    ArtisthomePage,
    ScoutPage,
    UsersPage,
    ArtistProfilePage,
    ArtistProfileUpdatePage,
    ScoutProfileUpdatePage,
    GalleryPage,
    UploadPreviewPage, 
    ScouteProfilePage,
    DisplayPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}