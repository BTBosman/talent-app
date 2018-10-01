import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArtistProfilePage } from '../artist-profile/artist-profile';
import { ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ProfilePage } from '../profile/profile';
import { DisplayPage } from '../display/display';
import {CommentsPage} from '../comments/comments'
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-scout',
  templateUrl: 'scout.html',
})
export class ScoutPage {
  videos = [];
  color = "primary";
  constructor(private firebaseService:FirebaseProvider, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  
    this.firebaseService.getAllvideos().then((data:any) =>{
      if (this.videos != null || this.videos != undefined){
        this.videos = undefined;
        this.videos = null;
      }
   
       this.videos = data;
     });
  
  }
  Upload(){
    this.navCtrl.push(HomePage);
  }

  profile(a){
    const modal = this.modalCtrl.create(DisplayPage,{user:this.videos[a].name});
    console.log(a);
    modal.present();
  

  }

  
   test(indexNUmber){
     this.navCtrl.push(CommentsPage, {vid:this.videos[indexNUmber]})
   }
viewartist(){
  const modal = this.modalCtrl.create(ArtistProfilePage);
  modal.present();
}


}
