import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Talent} from '../../Modals/Talent';
import { FirebaseProvider} from '../../providers/firebase/firebase';
import { HomePage } from '../home/home';
import { unescapeIdentifier } from '@angular/compiler';
import { ScoutPage } from '../scout/scout';
import { ArtisthomePage } from '../artisthome/artisthome';

@IonicPage()
@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html',
})
export class ArtistPage {
  artist = {} as Talent;
  url;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebaseService:FirebaseProvider,public alertCtrl:AlertController) {

  }
  reg(){
    if (this.artist.username == undefined && this.artist.email == undefined && this.artist.password == undefined && this.artist.name == undefined && this.artist.surname == undefined && this.artist.gender == undefined && this.artist.cellno == undefined && this.artist.age == undefined){
    const alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: ' Please provide your full details to register!',
      buttons: ['Ok']
    });
    alert.present();
      
    }else if (this.artist.username == undefined){
    const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Username cannot be left out',
        buttons: ['Ok']
      });
    alert.present();
 
    }else if (this.artist.name == undefined){
      const alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Name cannot be left out',
        buttons: ['Ok']
      });
      alert.present();
    }
   
    else if (this.artist.surname == undefined){
      const alert = this.alertCtrl.create({
      title: 'Warning',
        subTitle: 'Surname cannot be left out!',
        buttons: ['OK']
      });
      alert.present();
      
    }
    else if (this.artist.email == undefined){
     const alert = this.alertCtrl.create({
     title: 'Warning',
     subTitle: 'Email cannot be left out!',
     buttons: ['OK']
      });
      alert.present();
   
    }
    else if (this.artist.password == undefined){
     const alert = this.alertCtrl.create({
       title: 'Warning',
       subTitle: 'Email cannot be left out!',
       buttons: ['OK']
      });
      alert.present();
    }
    
    else if (this.artist.gender == undefined){
     const alert = this.alertCtrl.create({
       title: 'Warning',
       subTitle: 'Password cannot be left out!',
        buttons: ['OK']
      });
      alert.present();
    }
    else if (this.artist.cellno == undefined){
     const alert = this.alertCtrl.create({
       title: 'Warning',
       subTitle: 'Gender cannot be left out!',
       buttons: ['OK']
      });
      alert.present();

    }
    else if (this.artist.age == undefined){
     const alert = this.alertCtrl.create({
       title: 'Warning',
        subTitle: 'Cell number cannot be left out!',
        buttons: ['OK']
      });
      alert.present();
    }else {
      this.firebaseService.addImage(this.artist.username).then(data =>{
        console.log(data)
        this.firebaseService.getimagepropicurl(this.artist.username).then(data =>{
          console.log(data)
          this.firebaseService.registerTalentPerson(this.artist.username,this.artist.email, this.artist.password, this.artist.name, this.artist.surname, this.artist.gender, this.artist.cellno, this.artist.age).then(data =>{
            console.log(data)
            this.firebaseService.getuserType().then(()=>{
              const alert = this.alertCtrl.create({
              title: 'Welcome',
              subTitle: 'You have successfully Registered',
              buttons: ['OK']
              });
              alert.present();
              this.navCtrl.push(ArtisthomePage);
              window.location.reload();
          })

        }, Error =>{
            const alert = this.alertCtrl.create({
              title: 'warning!',
              subTitle: Error,
              buttons: ['OK']
            });
             alert.present();
          })
        })
      })
    }

}
  
  takePicture(){
    const confirm = this.alertCtrl.create({
      title: 'Options?',
      message: 'Please Choose one of the options',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          type: 'file'
        },
      ],
      buttons: [
        {
          text: 'Upload Photo',
          handler: data => {
           // this.converImg(`${data.title}`);
          //console.log(this.url);
         }
        },
        {
          text: 'Take Photo',
          handler: () => {
         this.firebaseService.uploadpic();
          }
        }
      ]
    });
    confirm.present();
  }
}






