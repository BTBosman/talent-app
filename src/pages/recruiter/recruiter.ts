import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Recruit } from '../../Modals/Recruit';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ScoutPage } from '../scout/scout';

@IonicPage()
@Component({
 selector: 'page-recruiter',
 templateUrl: 'recruiter.html',
})
export class RecruiterPage {
  recrt = {} as Recruit;

 constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService:FirebaseProvider,public alertCtrl:AlertController) {
 }

 reg(){
if (this.recrt.email == undefined && this.recrt.password == undefined && this.recrt.name == undefined && this.recrt.surname == undefined && this.recrt.companyName == undefined && this.recrt.companyemail == undefined && this.recrt.companycellno == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Please provide your full details to register!',
   buttons: ['OK']
 });
 alert.present();
}else if (this.recrt.name == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Name cannot be left out!',
   buttons: ['OK']
 });
 alert.present();
} else if (this.recrt.surname == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Username cannot be left out!',
   buttons: ['OK']
 });
 alert.present();
}else if (this.recrt.email == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Email cannot be left out!',
   buttons: ['OK']
 });
 alert.present();
}else if (this.recrt.password == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Password cannot be left out!',
   buttons: ['OK']
 });
 alert.present();
}else if (this.recrt.companyName == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Company name cannot be left out!',
   buttons: ['OK']
 });
 alert.present();
}else if (this.recrt.companyemail == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Company email cannot be left out!',
   buttons: ['OK']
 });
 alert.present();
}else if (this.recrt.companycellno == undefined){
 const alert = this.alertCtrl.create({
   title: 'Warning',
   subTitle: 'Company cell number cannot be left out!',
   buttons: ['OK']
 });
 alert.present();

}else  { this.firebaseService.getimagepropicurl(this.recrt.surname).then(data =>{
  console.log(data)
  this.firebaseService.registerScoutPerson(this.recrt.email, this.recrt.password, this.recrt.name, this.recrt.surname, this.recrt.companyName, this.recrt.companyemail, this.recrt.companycellno).then(() =>{
    const alert = this.alertCtrl.create({
      title: 'Welcome',
      subTitle: 'You have successfully Registered',
      buttons: ['OK']
    });
    this.navCtrl.push(ScoutPage);
    window.location.reload();
    alert.present();
})
})

  }
}
takePicture(){
  this.firebaseService.uploadpic();
}
}