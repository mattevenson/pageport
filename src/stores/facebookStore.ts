import { observable, action } from "mobx";

export class FacebookStore {
  @observable pages?: any[];

  @action setPages(pages: any[]) {
    this.pages = pages;
    console.log(pages);
  }

  fetchPages() {
    FB.getLoginStatus(() => {
      FB.api(
        "/me/likes?fields=name,location,cover,description",
        (response: any) => {
          const pages: any[] = [];
          response.data.forEach((page: any) => {
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
