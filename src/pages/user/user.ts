import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { UsersPage} from '../users/users';
import { FirebaseProvider} from '../../providers/firebase/firebase';
import {Guest} from '../../Modals/Guest';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
selector: 'page-user',
templateUrl: 'user.html',
})
export class UserPage {
guest = {} as Guest;

constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService:FirebaseProvider,public alertCtrl:AlertController) {
}
 reg(){
   var message;
if ( this.guest.Username == undefined && this.guest.email == undefined && this.guest.password == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: ' Please provide your full details to register!',
   buttons: ['OK']
 });
 alert.present();
} else if (this.guest.email == undefined){
 const alert = this.alertCtrl.create({
   title: 'Wearning',
   subTitle: 'Email cannot be left out',
   buttons: ['OK']
 });
 alert.present();
} else if (this.guest.password == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Password cannot be left out',
   buttons: ['OK']
 });
 alert.present();
} else if (this.guest.Username == undefined){
  const alert = this.alertCtrl.create({
    title: 'Warning',
    subTitle: 'Username cannot be left out',
    buttons: ['OK']
  });
  alert.present();
  
}else { this.firebaseService.getimagepropicurl(this.guest.Username).then(data =>{
  console.log(data)
  this.firebaseService.registerUser(this.guest.email, this.guest.password,this.guest.Username).then(() => {
    const alert = this.alertCtrl.create({
    title: 'Welcome',
    subTitle: 'You have successfully Registared',
    buttons: ['OK']
  });
  this.navCtrl.push(UsersPage);
  window.location.reload();
  alert.present(); 
  }, Error => {
    const alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: Error,
      buttons: ['Ok']
    });
    alert.present();
  }
  takePicture(){
    this.firebaseService.uploadpic();
}
}