import { observable, action, computed } from "mobx";
import { initFirestorter, Collection, Document } from "firestorter";
import { ViewState } from "react-map-gl";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const tzLookup = require("tz-lookup");

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
    tz?: string;
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
  utc?: number;
  category: string;
  count?: number;
}

export class Store {
  @observable user?: firebase.User;

  @observable pages: Page[] = [];

  @observable range?: number[];

  @observable drawer: boolean = false;

  @action setPages(pages: Page[]) {
    this.pages = pages;
    console.log(this.pages.length);
  }

  @action setUser(user: firebase.User | undefined) {
    this.user = user;
  }

  @action setRange(range?: number[]) {
    this.range = range;
  }

  @action toggleDrawer() {
    this.drawer = !this.drawer;
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

  async fetchPages() {
    FB.getLoginStatus(() => {
      FB.api(
        "/me/likes?fields=id,name,location{latitude,longitude},website,link,picture.type(large)",
        async (response: any) => {
          const pages: Page[] = [];
          for (const page of response.data) {
            console.log(page.category);
            if (page.location && page.location.latitude) {
              const { latitude, longitude } = page.location;
              page.location.tz = tzLookup(latitude, longitude);
              pages.push(page);
            }
          }
          this.setPages(pages);
        }
      );
    });
  }

  @computed get pagesWithDates(): Page[] {
    let count = 1;
    const pages = this.pages
      .map(page => {
        const visit = visits.docs.find(v => v.data.id === page.id);
        return {
          ...page,
          utc: visit ? visit.data.utc : undefined
        };
      })
      .sort((a, b) => {
        if (!a.utc && b.utc) {
          return 1;
        } else if (a.utc && !b.utc) {
          return -1;
        } else if (!a.utc && !b.utc) {
          return 0;
        } else {
          return a.utc! - b.utc!;
        }
      })
      .map(a => ({
        ...a,
        count: a.utc && a.utc > new Date().getTime() ? count++ : 0
      }));

    if (!this.drawer || !this.range) {
      return pages;
    }

    return pages.filter(
      page =>
        page.utc && page.utc >= this.range![0] && page.utc <= this.range![1]
    );
  }

  @computed get coordinates() {
    return this.pagesWithDates
      .filter(page => page.utc)
      .map(page => [page.location!.longitude!, page.location!.latitude!]);
  }
}

initFirestorter({ firebase: firebase });

export type VisitType = {
  id: number;
  utc: number;
};

export type Visit = Document<VisitType>;

export type Visits = Collection<Visit>;

export const visits = new Collection<Visit>("visits");

export default new Store();
