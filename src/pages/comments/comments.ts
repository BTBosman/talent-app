import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase'
import { DisplayPage } from '../display/display';


@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  videos2 =  this.navParams.get('vid');
  videos= new Array();
  comments =[];
  arr = []
  comments2 =  [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseService: FirebaseProvider, private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.comments.length = 0;
    this.comments2.length = 0;
    this.videos.push(this.videos2);
     this.getComments();
  }
    
    getComments(){
      this.firebaseService.getcomments(this.videos[0].key).then((data:any) =>{
        this.comments = data;
         var i = 0;
        for (var x = this.comments.length - 1; x  >= 0; x--){
           this.comments2[i] = this.comments[x];
           i++;
        }
       })
    }

  placeComment(commet){
  
    this.firebaseService.comment(this.videos[0].key, commet).then(data =>{
      this.firebaseService.addNumComments(this.videos[0].key, this.comments.length ,this.videos[0].name );
      this.comments.length = 0;
      this.comments2.length = 0;
      this.getComments()
      
 
  })
  }

  profile(a){
    const modal = this.modalCtrl.create(DisplayPage,{user:this.videos[a].name});
    console.log(a);
    modal.present();
  }

 }
