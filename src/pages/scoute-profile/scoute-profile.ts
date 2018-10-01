import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ScoutProfileUpdatePage } from '../scout-profile-update/scout-profile-update';

/**
 * Generated class for the ScouteProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scoute-profile',
  templateUrl: 'scoute-profile.html',
})
export class ScouteProfilePage {

  scout = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService: FirebaseProvider) {
    this.firebaseService.getuserType();
  }

  ionViewDidLoad() {
    this.firebaseService.getScoutProfile().then((data4:any) =>{
    this.scout = data4;
    console.log(this.scout);
    })
    
  }
  update(){
    this.navCtrl.push(ScoutProfileUpdatePage)
  }
}
