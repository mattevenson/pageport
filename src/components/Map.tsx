import React from "react";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import { observer, inject } from "mobx-react";
import { Store, Page } from "../store";
import PolylineOverlay from "./PolylineOverlay";
import * as d3 from "d3-ease";
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
      id={page.id}
      utc={page.utc}
      tz={page.location!.tz!}
      count={page.count!}
      website={page.website}
      link={page.link}
    />
  ));

interface IProps {
  store?: Store;
}

const Map: React.SFC<IProps> = ({ children, store }) => (
  <div style={{ width: "100%", height: "100%", position: "absolute" }}>
    <ReactMapGL
      {...store!.viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken="pk.eyJ1IjoibWF0dGV2ZW5zb24iLCJhIjoiY2p1ZjRza3B6MGFoNjRmcGptZzJicmswaiJ9.XdKarNxE21bMkSSt6HuFAA"
      onViewportChange={viewState => store!.setViewport(viewState)}
    >
      {store!.overlay && (
        <div>
          <PolylineOverlay
            points={store!.coordinates[0]}
            lineWidth={3}
            color="#1890ff"
          />
          <PolylineOverlay
            points={store!.coordinates[1]}
            lineWidth={3}
            color="#1890ff"
            dashed
          />
        </div>
      )}
      {mapPagesToPins(store!.pagesWithDates)}
      {children}
    </ReactMapGL>
  </div>
);

export default inject("store")(observer(Map));
