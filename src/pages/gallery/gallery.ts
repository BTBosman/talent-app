import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CommentsPage } from '../comments/comments';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  videos = [];
  myVideos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService: FirebaseProvider) {
    this.firebaseService.getuserType();
  }

  ionViewDidLoad() {
    this.myVideos.length = 0;
    this.firebaseService.getUploads().then((data2:any) =>{
      if (this.myVideos != null || this.myVideos != undefined){
        this.myVideos = undefined;
        this.myVideos = null;
       }
    this.myVideos = data2;
    console.log(this.myVideos);
  })
   }

   like(keyIndex){
    this.firebaseService.likeVideo(this.videos[keyIndex].key).then(() =>{
      if (this.videos[keyIndex].color == "grey"){
        this.firebaseService.addNumOfLikes(this.videos[keyIndex].name, this.videos[keyIndex].key, this.videos[keyIndex].likes).then (data =>{
          this.ionViewDidLoad();
        })
      }
    else if (this.videos[keyIndex].color == "primary"){
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

}
