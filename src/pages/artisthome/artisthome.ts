import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import {CommentsPage} from '../comments/comments'
import { ArtistProfilePage } from '../artist-profile/artist-profile';
import { ProfilePage } from '../profile/profile';
import { ArtistProfileUpdatePage } from '../artist-profile-update/artist-profile-update';

import { DisplayPage } from '../display/display';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
 selector: 'page-artisthome',
 templateUrl: 'artisthome.html',
})
export class ArtisthomePage {
videos = [];
myVideos = [];
color = "primary";
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService:FirebaseProvider, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
   
   this.firebaseService.getAllvideos().then((data:any) =>{
    if (this.videos != null || this.videos != undefined){
     this.videos = undefined;
     this.videos = null;
    }
     this.videos = data;
     this.videos[0].date;
     console.log(this.videos);
   });
  }
  


  like(keyIndex){
    console.log(this.videos[keyIndex].color)
  this.firebaseService.likeVideo(this.videos[keyIndex].key).then(() =>{
    if (this.videos[keyIndex].color == 'grey'){
      this.firebaseService.addNumOfLikes(this.videos[keyIndex].name, this.videos[keyIndex].key, this.videos[keyIndex].likes).then (data =>{
        this.ionViewDidLoad();
      })
    }
  else if (this.videos[keyIndex].color == 'primary'){
         this.firebaseService.removeLike(this.videos[keyIndex].name, this.videos[keyIndex].key, this.videos[keyIndex].likes).then (data =>{
          this.ionViewDidLoad();
         })
      }
else{
 this.firebaseService.addNumOfLikes(this.videos[keyIndex].name, this.videos[keyIndex].key, this.videos[keyIndex].likes).then (data =>{
 this.ionViewDidLoad();
 })
}
 })
}

 test(indexNUmber){
   this.navCtrl.push(CommentsPage, {vid:this.videos[indexNUmber]})
 }



  profile(a){
    const modal = this.modalCtrl.create(DisplayPage,{user:this.videos[a].name});
    console.log(a);
    modal.present();
  }
  
  addNumOfLikes(){

  }
Upload(){
  this.navCtrl.push(HomePage);
}
}

