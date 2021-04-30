import firebase from 'firebase'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCSdf1LtTv-vnNK88dgNdXdyEzxH88UIAU",
    authDomain: "etsy-pinterest-clone.firebaseapp.com",
    projectId: "etsy-pinterest-clone",
    storageBucket: "etsy-pinterest-clone.appspot.com",
    messagingSenderId: "747041786504",
    appId: "1:747041786504:web:10fba1344f1d970fb62d3d",
    measurementId: "G-B94K47E5V0"
  }


export const app = firebase.initializeApp(firebaseConfig)
