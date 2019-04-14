import React from "react";
import ReactMapGL from "react-map-gl";
import { observer, inject } from "mobx-react";
import { Store, PageWithDate } from "../store";
import Pin from "./Pin";

const mapPagesToPins = (pages: PageWithDate[]) =>
  pages.map(page => (
    <Pin
      longitude={page.location!.longitude!}
      latitude={page.location!.latitude!}
      name={page.name}
      src={page.picture.data.url}
      key={page.id}
      description={page.description!}
      id={page.id}
      utc={page.utc}
      tz={page.location!.tz!}
    />
  ));

interface IProps {
  store?: Store;
}

const Map: React.SFC<IProps> = ({ children, store }) => (
  <div style={{ width: "100%", height: "100%", position: "absolute" }}>
    <ReactMapGL
      {...store!.viewState}
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoibWF0dGV2ZW5zb24iLCJhIjoiY2p1ZjRza3B6MGFoNjRmcGptZzJicmswaiJ9.XdKarNxE21bMkSSt6HuFAA"
      onViewportChange={viewState => store!.setViewState(viewState)}
    >
      {mapPagesToPins(store!.pagesWithDates)}
      {children}
    </ReactMapGL>
  </div>
);

export default inject("store")(observer(Map));
