import { observable, action } from "mobx";
import { ViewState } from "react-map-gl";

export class MapStore {
  @observable viewState?: ViewState;

  @action setViewState(viewState: ViewState) {
    this.viewState = viewState;
  }
}

export default new MapStore();
