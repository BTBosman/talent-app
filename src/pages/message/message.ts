import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import {SeeMessagesPage} from '../see-messages/see-messages';


/**
* Generated class for the MessagePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
selector: 'page-message',
templateUrl: 'message.html',
})

export class MessagePage {
 @ViewChild(Content) chat : Content;


username = this.navParams.get('username');
name = this.navParams.get('name2');
messages = new Array();
lastSeen;

 constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService: FirebaseProvider) {

 }
 back(){
   alert('back')
 }
 ionViewDidLoad() {
   console.log(name)
if (this.username == null || this.username == undefined){
 this.username = this.navParams.get('path')
 this.name = this.navParams.get('name');
}
this.firebaseService.getLastSeen(this.name).then(data =>{
 this.lastSeen = data;
})
     console.log(this.username);
   this.firebaseService.getSentMessages(this.username).then((data:any) =>{
     this.messages.length = 0;
     this.messages = data;
     console.log(this.messages);
   })
   setTimeout(()=>{
     this.chat.scrollToBottom();
   })
 }

 sendMessage(message){
   this.messages.length = 0;
   this.firebaseService.sendMessage(this.username, message);
    var res = this.firebaseService.getresults();
    if (res == 'fail'){
      this.firebaseService.getImage(this.name);
       this.firebaseService.startConvo(this.username, message);
       setTimeout(()=>{
         this.chat.scrollToBottom();
       })
     }
    else if (res  == 'pass'){
      this.firebaseService.send(this.username, message)
      setTimeout(()=>{
       this.chat.scrollToBottom();
     })

      console.log(this.messages);
    }
  
 }
 goBack(){
   if (this.navParams.get('path') != undefined || this.navParams.get('path') != null){
     this.navCtrl.push(SeeMessagesPage);
   }
   else{
     this.navCtrl.pop();
   }


 }
}
