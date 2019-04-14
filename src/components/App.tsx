import React from "react";
import Map from "./Map";
import Login from "./Login";
import { inject, observer } from "mobx-react";
import ItineraryDrawer from "./ItineraryDrawer";
import { Store } from "../store";

interface IProps {
  store?: Store;
}

const App: React.SFC<IProps> = ({ store }) => (
  <div>
    <ItineraryDrawer />
    <Map>{!store!.user ? <Login /> : null}</Map>
  </div>
);

export default inject("store")(observer(App));
