import React from "react";
import ReactMapGL from "react-map-gl";
import { observer, inject } from "mobx-react";
import { FacebookStore } from "../stores/facebookStore";
import { MapStore } from "../stores/mapStore";

interface IProps {
  facebookStore?: FacebookStore;
  mapStore?: MapStore;
}

const Map: React.SFC<IProps> = ({ children, facebookStore, mapStore }) => (
  <div style={{ width: "100%", height: "100%", position: "absolute" }}>
    <ReactMapGL
      {...mapStore!.viewState}
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoibWF0dGV2ZW5zb24iLCJhIjoiY2p1ZjRza3B6MGFoNjRmcGptZzJicmswaiJ9.XdKarNxE21bMkSSt6HuFAA"
      onViewportChange={viewState => mapStore!.setViewState(viewState)}
    >
      <p>{JSON.stringify(facebookStore!.pages)}</p>
      {children}
    </ReactMapGL>
  </div>
);

export default inject("facebookStore", "mapStore")(observer(Map));
