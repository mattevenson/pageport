import { observable, action } from "mobx";
import * as firebase from "firebase/app";
import "firebase/auth";

export interface Page {
  name: string;
  location?: {
    city?: string;
    latitude?: number;
    longitude?: number;
    state?: string;
    zip?: string;
    country?: string;
  };
  cover: {
    source?: string;
  };
  description?: string;
  id: number;
}

export class FacebookStore {
  @observable pages: Page[] = [];

  @action setPages(pages: Page[]) {
    this.pages = pages;
    console.log(this.pages.length);
  }

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.fetchPages();
      }
    });
  }

  fetchPages() {
    FB.getLoginStatus(() => {
      FB.api(
        "/me/likes?fields=name,location,cover,description",
        (response: any) => {
          const pages: Page[] = [];
          response.data.forEach((page: Page) => {
            if (page.location && page.location.latitude) {
              pages.push(page);
            }
          });
          this.setPages(pages);
        }
      );
    });
  }
}

export default new FacebookStore();
