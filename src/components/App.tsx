import React from "react";
import Map from "./Map";
import Login from "./Login";
import { Button, Icon } from "antd";
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
      style={{ position: "absolute", zIndex: 1000, top: 20, left: 20 }}
      onClick={() => store!.toggleDrawer()}
    >
      Schedule
    </Button>
    <ItineraryDrawer />
    <Map>{!store!.user ? <Login /> : null}</Map>
  </div>
);

export default inject("store")(observer(App));
