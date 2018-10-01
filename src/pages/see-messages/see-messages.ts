import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { MessagePage } from '../message/message'
import { LoadingController, Loading } from 'ionic-angular';

/**
* Generated class for the SeeMessagesPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
selector: 'page-see-messages',
templateUrl: 'see-messages.html',
})
export class SeeMessagesPage {
messages = new Array();
constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams,private firebaseService: FirebaseProvider) {

}
ionViewDidEnter(){
 this.messages.length = 0;
 this.firebaseService.getAllMessages().then(data =>{
     let loading = this.loadingCtrl.create({
       spinner: 'bubbles',
       content: 'Please wait',
       duration: 1300
     });
     loading.present();
     setTimeout(() =>{
       this.firebaseService.returnAllMessages().then((data2:any) =>{
         this.messages.length = 0;
         this.messages  = data2;
         console.log(this.messages);
         console.log('see messages')
     })
     },500)
 })
}
ionViewWillEnter(){

}
 ionViewDidLoad() {

 }
more(i){
this.navCtrl.push( MessagePage, {path:this.messages[i].path, name:this.messages[i].name})
}
}