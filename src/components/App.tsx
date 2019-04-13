import React from "react";
import Map from "./Map";
import Login from "./Login";
import { inject, observer } from "mobx-react";
import { Store } from "../store";

interface IProps {
  store?: Store;
}

const App: React.SFC<IProps> = ({ store }) => (
  <Map>{!store!.user ? <Login /> : null}</Map>
);

export default inject("store")(observer(App));
