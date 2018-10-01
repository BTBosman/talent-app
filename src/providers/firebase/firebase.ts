import { Injectable } from '@angular/core';
import {Camera,CameraOptions} from '@ionic-native/camera';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingController, Loading } from 'ionic-angular';
import moment from 'moment';
import { rendererTypeName } from '@angular/compiler';
declare var firebase;

@Injectable()
export class FirebaseProvider {

  database = firebase.database();
  authnticate  = firebase.auth();
  storageRef = firebase.storage();

  userIDl;
  dbRef;
  state;
  image;
  file;
  username;
  imgurl;
  currentUserID;

  profile =  new Array();
  comments =  new Array();
  videoArray = new Array();
  MyvidsArray = new Array();
  arr = new Array();
  arr2 = new Array();
  scoutArray = new Array();
  messages =  new Array();
  messages2 =  new Array();
  messagePath =  new Array();
  names = new Array();
  results;
  lastSeen; 
  messagePic =  new Array();
  messagepicture;
  path;
  userKey;
  
  constructor(private camera:Camera, public loadingCtrl: LoadingController) {
  }

login(email, password){
  return new Promise((accept,reject) =>{
    this.authnticate.signInWithEmailAndPassword(email, password).then(()=>{
    accept("success")
    }, Error =>{
      reject(Error.message)
    })
  })

}

addMoreUserINformation(name, surname,dateOfBirth, gender, cmpNme, cmpEmail, cmpTel, Bio){
 return new Promise ((accpt,rej) =>{
  var image;
  if (this.image == undefined || this.image == null){
    image = '../../assets/imgs/pic.jpg';
  }
  if (name == undefined){
    name = ""
  }
  if (surname == undefined){
    surname = ""
  }
  if (dateOfBirth == undefined){
    dateOfBirth = ""
  }
  if (gender == undefined){
    gender = ""
  }
  if (cmpNme == undefined){
    cmpNme = ""
  }
  if ( cmpEmail == undefined){
    cmpEmail = ""
  }
  if (cmpTel == undefined){
    cmpTel = ""
  }
  if (Bio == undefined){
    Bio = ""
  }
   var path = 'users/' + this.currentUserID + '/' + this.userKey;
   this.database.ref(path).update({
     name : name,
     surname : surname,
     dateOfBirth : dateOfBirth,
     gender : gender,
     compName: cmpNme,
     compEmail: cmpEmail,
     compTel : cmpTel,
     imageURl:  image,
     Bio : Bio
   })
   accpt('done')
 })
}


  registerUser(email,password, Username){

    return new Promise((accept,reject) =>{
      this.authnticate.createUserWithEmailAndPassword(email, password).then(()=>{
        var user = firebase.auth().currentUser;
        this.dbRef =  'users/' + Username + ":" + user.uid;
        this.database.ref(this.dbRef).push({
          Username:Username,
          name: " ",
          surname:" ",
          dateOfBirth:" ",
          gender:" ",
          compName:" ",
          compEmail: " ",
          compTel : " ",
          imageURl:  '../../assets/imgs/pic.jpg',
          Bio : " "
        })
      accept("user registred")
      }, Error =>{
        reject(Error.message)
      })
    })
  }
  
  logout(){
    console.log('exit')
    var user = firebase.auth().currentUser;
    var day = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.database.ref('lastSeen/' + this.username).set({
      time: day
    })
    this.authnticate.signOut();
  }

  getUserSatate(){
    return new Promise ((accpt, rej) =>{ 
      this.authnticate.onAuthStateChanged(user =>{ 
        if (user != null){
          this.state = 1;
        }
        else{
        this.state = 0;
        }
        accpt(this.state);
       });
    })
  }

  forgotUserPassword(email:any){
    return this.authnticate.sendPasswordResetEmail(email);
  }


addImage(username){
  let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait',
    duration: 17000
  });
  loading.present();
  return new Promise ((accpt, rej) =>{
    this.storageRef.ref('pictures/' + username + ".jpg").putString(this.image, 'data_url');
    loading.dismiss();
    accpt("image added to storage")
  })

}

getimagepropicurl(username){
  let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Almost done, Please wait!',
    duration: 5000
  });
  loading.present();
return new Promise ((accpt,rej) =>{
  var storageRef = firebase.storage().ref('pictures/' + username + ".jpg");
  storageRef.getDownloadURL().then(url => {
    this.storePictureUrl(url);
    loading.dismiss();
    accpt("image url found")
  })
})
}


  async uploadpic(){
    const options: CameraOptions= {
    quality : 100,
    targetWidth: 600,
    targetHeight: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
    }
      const results = await this.camera.getPicture(options);
      this.image = `data:image/jpeg;base64,${results}`;
      return this.image;
  }


  uploadvid(vid){
    var d = Date.now();
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait',
      duration: 17000
    });
    loading.present();
  return new Promise((accpt,rejc) =>{
    loading.present();
  this.storageRef.ref(d + ".mp4").putString(vid, 'data_url').then(() =>{
    loading.dismiss();
    accpt(d);
  }, Error =>{
    rejc(Error.message)
  })
  })
  }

storeToDB(name, category, vidname, vidDesc){

  var d = Date.now();
  let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: 'Please wait',
    duration: 9000
  });
  loading.present();
  return new Promise((accpt,rejc) =>{
    var day = moment().format('MMMM Do YYYY, h:mm:ss a');
    var storageRef = firebase.storage().ref(name + ".mp4");
    storageRef.getDownloadURL().then(url => {
      console.log(url)
      var user = firebase.auth().currentUser;
      var link =  url;
      this.database.ref('uploads/' + this.username).push({
            downloadurl :link,
            name : vidname,
            category: category,
            description: vidDesc,
            username : this.username,
            userImg : this.imgurl,
            date : day,
            likes : 0,
            comments : 1
          });
          accpt('success');
}, Error =>{
  rejc(Error.message);
  console.log(Error.message);
});
})
} 

getUploads(){
  return new Promise((accpt,rej) =>{
    this.MyvidsArray.length = 0;
    this.database.ref('uploads/' + this.username).on('value',(data5:any) =>{
      var myVideos = data5.val();
      console.log(myVideos);
      var key:any = Object.keys(myVideos);
      for(var z = 0; z < key.length;z++){
        var k = key[z];
        let obj = {
          vidurl : myVideos[k].downloadurl,
          vidDesc : myVideos[k].description,
          vidname : myVideos[k].name,
          name : myVideos[k].username,
          img : myVideos[k].userImg,
          date : moment(myVideos[k].date,'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow()
        }
        this.MyvidsArray.push(obj);
        accpt(this.MyvidsArray) 
      }
      console.log(this.MyvidsArray);
      })
    })
  }
  

getAllvideos(){
  return new Promise ((accpt, rej) =>{
    this.database.ref('uploads/').on('value', (data: any) => {
      var videos = data.val();
      this.videoArray.length = 0;
      var keys:any =  Object.keys(videos);
        for (var i = 0; i < keys.length; i++){
          var x = keys[i];
          var y  = 'uploads/' + x;
          var details;
          var colour;
          this.database.ref(y).on('value', (data2: any) => {
           details = data2.val();
            })
          var keys2:any = Object.keys(details);
          for (var a = 0; a < keys2.length; a++){
                var key = keys2[a];
            this.database.ref('likes/' + key).on('value', (data3: any) => {
              if (data3.val() != null || data3.val() != undefined)
              {
                var likes = data3.val();
                var likesKey:any = Object.keys(likes )
              if (likes[likesKey[0]].username == this.currentUserID){
                colour = "primary";
              }
              else{
                colour = "grey";
              }
              
            }
            else{
              colour = "grey";
              
            }
            })
                let obj = {
                likes: details[key].likes,
                comments : details[key].comments - 1,
                vidurl : details[key].downloadurl,
                vidDesc : details[key].description,
                vidname : details[key].name,
                name : details[key].username,
                img : details[key].userImg,
                date : moment(details[key].date,'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow(),
                color :colour,
                key: key
          }
          this.videoArray.push(obj);
          }
        }
       accpt(this.videoArray);
  }, Error =>{
    rej(Error.message)
  })
  })

} 
storeLastSeen(user2){
}

getuserType(){
  console.log('user type')
return new Promise ((accpt, rej) =>{
  this.database.ref('users').on('value', (data: any) => {
    var users =  data.val();
    var user = firebase.auth().currentUser;
    var  userIDs = Object.keys(users);
    for (var x = 0; x < userIDs.length; x++){
      var str1 = new String( userIDs[x]); 
      var index = str1.indexOf( ":" ); 
      var currentUserID = userIDs[x].substr(index + 1);
      if (user.uid == currentUserID){
        this.storeUserName(userIDs[x].substr(0,index));
        this.storeLastSeen(userIDs[x].substr(0,index));
          this.database.ref('users/' + userIDs[x]).on('value', (data: any) => {
            var Userdetails = data.val(); 
            this.storeuserid(userIDs[x])
            var keys2:any = Object.keys(Userdetails);
            var user = firebase.auth().currentUser;
            let storageRef =  firebase.storage().ref();
           var img = userIDs[x].substr(0,index) + ".jpg"
            let imgRef = storageRef.child('pictures/' + img);
            var url2 = Userdetails[keys2[0]].imageURl;
            this.storeUserKey(keys2[0])
            imgRef.getDownloadURL().then(function(url) {
            this.storePictureUrl(url);
            }.bind(this)).catch(function(error) {
          
            })
            accpt(Userdetails[keys2].userType)
           });
        break;
      }
    }
  })
})
}

storeUserName(name){
this.username = name;
}

storePictureUrl(url){
  console.log(url)
this.imgurl =  url;
}

storeUserKey(key){
  console.log(key);
this.userKey = key;
}

storeuserid(uid){
this.currentUserID = uid;
console.log(this.currentUserID);
}

getProfile(){
  return new Promise ((accpt, rej) =>{
    this.database.ref('users/' + this.currentUserID).on('value', (data2: any) => {
      var details = data2.val();
      console.log(details);
      var keys = Object.keys(details)
      for (var x = 0; x< keys.length; x++){
        var key = keys[x];
        let obj = {
          age : details[key].age,
          cellno : details[key].cellno,
          gender: details[key].gender,
          imageURl: details[key].imageURl,
          name : details[key].name,
          surname : details[key].surname
        }
        this.profile.push(obj)
      }
      console.log(this.profile);
      accpt(this.profile);
       })
  })
}

getScoutProfile(){
  return new Promise((accpt,rej) =>{
    
    this.database.ref('users/' + this.currentUserID).on('value', (data4:any) =>{
      var details =  data4.val();
      console.log(details);
      var keys = Object.keys(details)

      for(var y = 0;y <keys.length;y++){
        var key = keys[y];
        let obj = {
           companyName: details[key].companyName,
           companycellno: details[key].companycellno,
           companyemail: details[key].companyemail,
           name: details[key].name
        }
        this.scoutArray.push(obj);
      }
      console.log(this.scoutArray);
      accpt(this.scoutArray);
    })
  })
}

getImage(user){
    this.arr2.length = 0;
    this.database.ref('users/').on('value', (data: any) => {
      var users =  data.val();
      var  userIDs = Object.keys(users);
      for(var x = 0; x < userIDs.length; x++){
        var str1 = new String( userIDs[x]);
        var index = str1.indexOf( ":" );
        var username = userIDs[x].substr(0,index);
        if (user == username){
          this.database.ref('users/' + userIDs[x]).on('value', (data2: any) => {
            var userFound = data2.val();
            var keys:any = Object.keys(userFound);
            for(var b = 0; b <keys.length;b++){
              var k =  keys[b];
              this.messagepicture = userFound[k].imageURl
              console.log(this.messagepicture);
              break;
            }
           })
          }
        }
    })
        
}

viewArtistProfile(user){
  return new Promise ((accpt, rej) =>{
    this.arr2.length = 0;
    this.database.ref('users/').on('value', (data: any) => {
      var users =  data.val();
      var  userIDs = Object.keys(users);
      for(var x = 0; x < userIDs.length; x++){
        var str1 = new String( userIDs[x]);
        var index = str1.indexOf( ":" );
        var username = userIDs[x].substr(0,index);
        if (user == username){
          this.database.ref('users/' + userIDs[x]).on('value', (data2: any) => {
            var userFound = data2.val();
            var keys:any = Object.keys(userFound);
            for(var b = 0; b <keys.length;b++){
              var k =  keys[b];
              let obj = {
              age: userFound[k].age,
              cellno: userFound[k].cellno,
              gender: userFound[k].gender,
              name: userFound[k].name,
              surname: userFound[k].surname,
              img : userFound[k].imageURl
              }
              this.arr2.push(obj);
              accpt(this.arr2);
            };
           })
          break;
        }
      }
  }, Error =>{
    rej(Error.message)
  })
  })
}

comment(key,text){
  return new Promise ((accpt, rej) =>{
if (this.imgurl == undefined || this.imgurl == null){
  this.database.ref('users/' + this.currentUserID).on('value', (data2: any) => {
    var details = data2.val();
    var keys = Object.keys(details);
    this.storePictureUrl(details[keys[0]].imageURl)
  })
}

   var day = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.database.ref('comments/' + key).push({
      text:text,
      username: this.username,
      date : day,
      // img : this.imgurl
      img : this.imgurl
    })
    accpt("comment added")
  })
}
getcomments(key){
  return new Promise ((pass,fail) =>{
    this.database.ref('comments/' + key).on('value', (data2: any) => {
      var details = data2.val();
      if (details != null ||  details != undefined){
        this.comments.length = 0;
        var keys = Object.keys(details) 
        for (var x =0; x < keys.length; x++){
          var key = keys[x];
          let obj = {
            date :moment( details[key].date,'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow(),
            text :  details[key].text,
            name : details[key].username,
            img: details[key].img
          }
          this.comments.push(obj)
        }
          pass(this.comments);
          console.log(this.comments);
      }
      })
  })
}

addNumComments(key, numComments, user){
  var num =  numComments  + 1;
  this.database.ref('uploads/' + user+ "/"+ key).update({comments: num});
  console.log("comment number added")
}

likeVideo(key){
  return new Promise ((accpt, rej) =>{
    this.database.ref('likes/' + key).push({
      username : this.currentUserID
    })
    accpt('liked')
  })

}

addNumOfLikes(username, key, num){
  num =  num  + 1;
  return new Promise ((accpt, rej) =>{
    this.database.ref('uploads/' + username + '/' + key).update({likes: num});
    accpt('like added')
  })
}

removeLike(username, key, num){
  num =  num  - 1;
  return new Promise ((accpt, rej) =>{
    this.database.ref('uploads/' + username + '/' + key).update({likes: num});
    this.database.ref('likes/' + key).remove();
    accpt('like removed')
  })
}

sendMessage(username, text):any{
    var today = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.database.ref('message/' + username).on('value', (data: any) => {
      if ( data.val() != null ||  data.val() != undefined){
        this.assisgStatus('pass')
      }
      else{
       this.assisgStatus('fail')
      }
    })
}

assisgStatus(status){
this.results =  status;
console.log(this.results);
}


getresults(){
  return this.results;
}


startConvo(username, text){
  if (this.imgurl == undefined || this.imgurl == null){
    this.database.ref('users/' + this.currentUserID).on('value', (data2: any) => {
      var details = data2.val();
      var keys = Object.keys(details);
      this.storePictureUrl(details[keys[0]].imageURl)
    })
  }
  var day = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log(username);
    this.database.ref('message/' + username).push({
      date : day,
      message : text,
      name : this.username,
      receiver : this.messagepicture,
      sender : this.imgurl
    })
   console.log("convo started")
}


send(username, text){
  var day = moment().format('MMMM Do YYYY, h:mm:ss a');
  this.database.ref('message/' + username).push({
    date : day,
    message : text,
    name : this.username
  })
  console.log('message sent')
}

getSentMessages(path){
  console.log('getSentMessages')
return new Promise ((accpt, rej) =>{
  var float;
  var color;

  this.messages.length = 0;
  this.database.ref('message/' + path).on('value', (data: any) => {
    if ( data.val() != null ||  data.val() != undefined){
      var messages =  data.val();
      var keys =  Object.keys(messages);
      for (var x = 0; x < keys.length; x++){
        var key = keys[x];
        if (messages[key].name == this.username){
          float = {'float' : 'right'}
          color = 'light';
        }
        else{
          float = {'float' : 'left'};
          color = 'red';
        }
        let obj = {
          message: messages[key].message,
          date : moment(messages[key].date,'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow(),
          color : color,
          float : float
        }
        this.messages.push(obj)
      }
      accpt(this.messages);
    }
  })
})
}

resetss(i){
alert(i)
this.videoArray = [];

var user = firebase.auth().currentUser;
var storageRef = firebase.storage().ref().child(i);

// Delete the file
storageRef.delete().then(function() {
  console.log('Deleted');
  // File deleted successfully
}).catch(function(error) {
  // Uh-oh, an error occurred!
});
}

getLastSeen(user){
return new Promise ((accpt, rej) =>{
  this.database.ref('lastSeen/' + user).on('value', (data: any) => {
    if (data.val() != null || data.val() != undefined){
      this.lastSeen =  moment(data.val().time, 'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow();
      accpt(this.lastSeen);
    }
  })
})
 
}


getAllMessages(){
  console.log('getAllMessages')
  this.messagePath.length = 0;
  this.messagePic.length = 0;
  this.names.length = 0;
return new Promise ((accpt,rej) =>{
  this.database.ref('message').on('value', (data: any) => {
    if (data.val() != null || data.val() !=  undefined){
    this.messages2.length = 0;
    var objects = data.val();
    var key = Object.keys(objects);
    for (var x = 0; x < key.length; x++){
      var str1 = new String( key[x]);
      var index = str1.indexOf( ":" );
      var messageID =  str1.substr(index + 1,str1.length);
      var messageID2 = str1.substr(0,index)
        if (messageID == this.username)
        {
          this.setMessagePath( key[x], messageID2);
        }
        else if (messageID2 == this.username){
        this.setMessagePath(key[x], messageID);
      }
      accpt('finished')
    }
    }
  })
})
}


getImagesURL(){
  this.messagePic.length = 0;
  return new Promise ((accpt, rej) =>{
    var length =  this.names.length;
    for (var x = 0; x < length; x++){
      let storageRef =  firebase.storage().ref();
      var img = this.names[x] + ".jpg"
       let imgRef = storageRef.child('pictures/' + img);
       imgRef.getDownloadURL().then(function(url) {
        this.storeMessagePic(url);
       }.bind(this)).catch(function(error) {})
    }
    this.storeMessagePic(true);
    accpt(true)
  })
 
}

getConversation(user){
  console.log('get convo')
  return new Promise ((accpt, rej) =>{
    this.database.ref('message').on('value', (data: any) => {
      if (data.val() != null || data.val() != undefined){
        this.database.ref('message').on('value', (data: any) => {
          if (data.val() != null || data.val() !=  undefined){
          this.messages2.length = 0;
          var objects = data.val();
          var key = Object.keys(objects);
          for (var x = 0; x < key.length; x++){
            var str1 = new String( key[x]);
            var index = str1.indexOf( ":" );
            var messageID =  str1.substr(index + 1,str1.length);
            var messageID2 = str1.substr(0,index)
              if (messageID == this.username && user  == messageID2)
              {
                  this.storeDefaultPath(key[x]);
                  console.log('finished')
                  accpt('finished')
                  break;
              }
              else if (messageID2 == this.username && user == messageID){
                this.storeDefaultPath(key[x]);
                accpt('finished')
                console.log('finished')
                break;
            }
          }
          }
        })

      }
    })
    accpt('no path')
  })
}

storeDefaultPath(path){
this.path =  path;
}

getDefaultPath(){
  return this.path;
}

returnAllMessages(){
  return new Promise ((accpt,rej) =>{
    var length = this.messagePath.length;
    for (var i = 0; i < length; i++){
      this.database.ref('message/' + this.messagePath[i] ).on('value', (data: any) => {
        var Newmessg = data.val();
        var image;
        var key = Object.keys(Newmessg);
        var length2 =  key.length - 1;
         var receiverImage = Newmessg[key[0]].receiver;
        var senderImage = Newmessg[key[0]].sender;
        if (receiverImage == this.imgurl){
            image =  senderImage;
        }
        else{
          image =  receiverImage;
        }
        let obj = {
          key :  key[length2],
          name : this.names[i],
          message : Newmessg[key[length2]].message,
          date :   moment(Newmessg[key[length2]].date,'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow(),
          path : this.messagePath[i],
          img :   image
        }
        this.messages2.push(obj)
        accpt(this.messages2);
      
      })
    }
  })
}

storeMessagePic(url){

if (url == true){
}
else{
  this.messagePic.push(url);
  console.log(this.messagePic);

  
}

}

setMessagePath(path, name){
this.messagePath.push(path);
console.log(name)
this.names.push(name);

}

getusername(){
  return this.username;
}

}