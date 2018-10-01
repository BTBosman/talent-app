import { Component } from '@angular/core';
import { RegisterPage } from '../register/register';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FirebaseProvider} from '../../providers/firebase/firebase';
import {login} from '../../Modals/login'
import { ArtisthomePage } from '../artisthome/artisthome';
import {UserPage} from '../user/user';
import { updateDimensions } from 'ionic-angular/components/virtual-scroll/virtual-util';
import { UploadPreviewPage } from '../upload-preview/upload-preview';

@IonicPage()
@Component({
 selector: 'page-login',
 templateUrl: 'login.html',
})
export class LoginPage {
 name;
 users = {} as login;

 constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private firebaseService:FirebaseProvider,public loadingCtrl:LoadingController) {
 
 }

showForgotPassword(){
  const prompt = this.alertCtrl.create({
    title: 'Enter Your Email',
    message: "A new password will be sent to your email",
    inputs: [
      {
        name: 'recoverEmail',
        placeholder: 'you@example.com'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: data => {

          const loader = this.loadingCtrl.create({
            content: "Please wait.. resetting your password",
            duration: 2000
          });
          loader.present();

          this.firebaseService.forgotUserPassword(data.recoverEmail).then(() =>{
            // add toast
            loader.dismiss().then(() => {
            //show pop up
            let alert = this.alertCtrl.create({
            title: 'Check your email',
            subTitle: 'Password reset succesful',
            buttons: ['OK']
            });
              alert.present();
            })
          },error =>{ 
            loader.dismiss().then(() => {
            let alert = this.alertCtrl.create({
            title: 'Error resseting password',
            subTitle:error.message,
            buttons: ['OK']
            });
            alert.present();
          })
          });
        }
      }
    ]
  });
  prompt.present();
  }

  login(){
    this.firebaseService.login(this.users.email,this.users.password).then(()=>{
      this.firebaseService.getuserType().then(() =>{
        const alert = this.alertCtrl.create({
          title: 'Welcome',
          message: 'You have successfully logged in',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(ArtisthomePage);
      })
    }, Error =>{
      if (this.users.email == undefined && this.users.password == undefined){
        const alert = this.alertCtrl.create({
          title: 'Warning!',
          subTitle: 'Please provide your log in details to log in!',
          buttons: ['Ok']
        });
        alert.present();
      }
      else if (this.users.email == undefined){
        const alert = this.alertCtrl.create({
          title: 'Warning!',
          subTitle: 'Email cannot be left out!',
          buttons: ['Ok']
        });
        alert.present();
      }else if (this.users.password == undefined ){
        const alert = this.alertCtrl.create({
          title: 'Warning!',
          subTitle: 'Password cannot be left out!',
          buttons: ['Ok']
        });
        alert.present();
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Warning!',
          message: Error,
          buttons: ['OK']
        });
        alert.present();
      }
    })
  }
}