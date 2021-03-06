import React from "react";
import Map from "./Map";
import Login from "./Login";
import Logo from "./Logo";
import { Button } from "antd";
import { inject, observer } from "mobx-react";

import ItineraryDrawer from "./ItineraryDrawer";
import { Store } from "../store";

interface IProps {
  store?: Store;
}

const App: React.SFC<IProps> = ({ store }) => (
  <div>
    <Button
      type="primary"
      size="large"
      shape="round"
      icon="bars"
      style={{ position: "absolute", zIndex: 1000, top: 42, left: 48 }}
      onClick={() => store!.toggleDrawer()}
    >
      Schedule
    </Button>
    <Logo />
    <ItineraryDrawer />
    <Map>{!store!.user ? <Login /> : null}</Map>
  </div>
);

export default inject("store")(observer(App));
