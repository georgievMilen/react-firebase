import firebase from "firebase"

const config = {
    apiKey: "AIzaSyD5QCrr94yD0Hq5K1BcCq9MDJ0u5msXV3Q",
    authDomain: "zingdev-cb4d4.firebaseapp.com",
    databaseURL: "https://zingdev-cb4d4.firebaseio.com",
    projectId: "zingdev-cb4d4",
    storageBucket: "zingdev-cb4d4.appspot.com",
    messagingSenderId: "378198019747",
    appId: "1:378198019747:web:2a5a0388a9921003b27916",
    measurementId: "G-J40JX9H1VZ"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  

  export default firebase;