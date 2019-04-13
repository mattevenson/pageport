import { observable, action } from "mobx";
import { initFirestorter, Collection, Document } from "firestorter";
import { ViewState } from "react-map-gl";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBo1fpxohHGslbE3k6Y9s0Cban4S9XXVLk",
  authDomain: "facebooking-74728.firebaseapp.com",
  databaseURL: "https://facebooking-74728.firebaseio.com",
  projectId: "facebooking-74728",
  storageBucket: "facebooking-74728.appspot.com",
  messagingSenderId: "236972949665"
});

export interface Page {
  name: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  picture: {
    data: {
      url: string;
    };
  };
  description?: string;
  id: number;
  link: string;
  website?: string;
}

export class Store {
  @observable user?: firebase.User;

  @observable pages: Page[] = [];

  @action setPages(pages: Page[]) {
    this.pages = pages;
    console.log(this.pages.length);
  }

  @action setUser(user: firebase.User | undefined) {
    this.user = user;
  }

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.fetchPages();
      }
      this.setUser(user || undefined);
    });
  }

  @observable viewState?: ViewState;

  @action setViewState(viewState: ViewState) {
    this.viewState = viewState;
  }

  fetchPages() {
    FB.getLoginStatus(() => {
      FB.api(
        "/me/likes?fields=id,name,location{latitude,longitude},category,website,link,picture.type(large)",
        (response: any) => {
          const pages: Page[] = [];
          response.data.forEach((page: Page) => {
            if (page.location && page.location!.latitude) {
              pages.push(page);
            }
          });
          this.setPages(pages);
        }
      );
    });
  }
}

initFirestorter({ firebase: firebase });

export type VisitType = {
  pageId: number;
  date: Date;
};

export type Visit = Document<VisitType>;

export type Visits = Collection<Visit>;

export const visits = new Collection<Visit>("visits");

export default new Store();
