import React from "react";
import ReactMapGL from "react-map-gl";
import { observer, inject } from "mobx-react";
import { FacebookStore, Page } from "../stores/facebookStore";
import { MapStore } from "../stores/mapStore";
import Pin from "./Pin";

const mapPagesToPins = (pages: Page[]) =>
  pages.map(page => (
    <Pin
      longitude={page.location!.longitude!}
      latitude={page.location!.latitude!}
      name={page.name}
      src={page.picture.data.url}
      key={page.id}
      description={page.description!}
    />
  ));

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
      {mapPagesToPins(facebookStore!.pages)}
      {children}
    </ReactMapGL>
  </div>
);

export default inject("facebookStore", "mapStore")(observer(Map));
