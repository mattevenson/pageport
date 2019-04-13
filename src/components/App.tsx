import React from "react";
import Map from "./Map";
import Login from "./Login";
import { inject, observer } from "mobx-react";
import { FirebaseStore } from "../stores/firebaseStore";

interface IProps {
  firebaseStore?: FirebaseStore;
}

const App: React.SFC<IProps> = ({ firebaseStore }) => (
  <Map>{!firebaseStore!.user ? <Login /> : null}</Map>
);

export default inject("firebaseStore")(observer(App));
