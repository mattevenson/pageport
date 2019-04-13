import { observable, action } from "mobx";
import * as firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyBo1fpxohHGslbE3k6Y9s0Cban4S9XXVLk",
  authDomain: "facebooking-74728.firebaseapp.com",
  databaseURL: "https://facebooking-74728.firebaseio.com",
  projectId: "facebooking-74728",
  storageBucket: "facebooking-74728.appspot.com",
  messagingSenderId: "236972949665"
});

export class FirebaseStore {
  @observable user?: firebase.User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.setUser(user || undefined);
    });
  }

  @action setUser(user: firebase.User | undefined) {
    this.user = user;
  }
}

export default new FirebaseStore();
