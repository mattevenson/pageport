import { observable, action, computed } from "mobx";
import { initFirestorter, Collection, Document } from "firestorter";
import { ViewState, ViewportProps, FlyToInterpolator } from "react-map-gl";
import * as d3 from "d3-ease";
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

const uidBox = observable.box<string | undefined>(undefined);

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

  @observable overlay: boolean = true;

  @action setPages(pages: Page[]) {
    this.pages = pages;
    console.log(this.pages.length);
  }

  @action setUser(user: firebase.User | undefined) {
    this.user = user;
    uidBox.set(user ? user.uid : undefined);
  }

  @action setRange(range?: number[]) {
    this.range = range;
  }

  @action toggleDrawer() {
    this.drawer = !this.drawer;
  }

  @action toggleOverlay() {
    this.overlay = !this.overlay;
  }

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.fetchPages();
      }
      this.setUser(user || undefined);
    });
  }

  @observable viewport?: Partial<ViewportProps>;

  @action setViewport(
    viewport: Partial<ViewportProps>,
    transition: boolean = false
  ) {
    this.viewport = {
      ...viewport,
      transitionDuration: transition ? 5000 : undefined,
      transitionInterpolator: transition ? new FlyToInterpolator() : undefined,
      transitionEasing: transition ? d3.easeCubic : undefined
    };
  }

  async fetchPages() {
    FB.getLoginStatus(() => {
      FB.api(
        "/me/likes?fields=id,name,location{latitude,longitude},website,link,picture.type(large)",
        async (response: any) => {
          const pages: Page[] = [];
          for (const page of response.data) {
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
    const split = this.pagesWithDates.filter(
      page => page.utc! <= new Date().getTime()
    ).length;
    const solid = this.pagesWithDates
      .slice(0, split)
      .map(page => [page.location!.longitude!, page.location!.latitude!]);
    const dashed = this.pagesWithDates
      .slice(split - 1, this.pagesWithDates.length)
      .filter(page => page.utc)
      .map(page => [page.location!.longitude!, page.location!.latitude!]);
    return [solid, dashed];
  }
}

initFirestorter({ firebase: firebase });

export type VisitType = {
  id: number;
  utc: number;
  uid: string;
};

export type Visit = Document<VisitType>;

export type Visits = Collection<Visit>;

const visits = new Collection<Visit>("visits");
visits.query = ref => {
  const uid = uidBox.get();
  return uid ? ref.where("uid", "==", uid) : null;
};

export { visits, uidBox };

export default new Store();
