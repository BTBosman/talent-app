import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoginPage } from '../login/login';
import { ArtisthomePage } from '../artisthome/artisthome';



@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController,public alertCtrl:AlertController,private firebaseService:FirebaseProvider) {
  }

   ionViewDidLoad() {
    const confirm = this.alertCtrl.create({
      title: 'Log Out',
      message: 'You are about to be logged out!',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            this.navCtrl.push(ArtisthomePage);
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            this.firebaseService.logout();
            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }
  }
