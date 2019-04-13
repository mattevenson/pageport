import React from "react";
import ReactMapGL from "react-map-gl";
import { observer, inject } from "mobx-react";
import { MapStore } from "../stores/mapStore";
import ReactResizeDetector from "react-resize-detector";

interface IProps {
  mapStore?: MapStore;
}

const Map: React.SFC<IProps> = inject("mapStore")(
  observer(({ mapStore }) => (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <ReactResizeDetector
        handleHeight
        handleWidth
        render={({ width, height }) => (
          <ReactMapGL
            width={width}
            height={height}
            mapboxApiAccessToken="pk.eyJ1IjoibWF0dGV2ZW5zb24iLCJhIjoiY2p1ZjRza3B6MGFoNjRmcGptZzJicmswaiJ9.XdKarNxE21bMkSSt6HuFAA"
          />
        )}
      />
    </div>
  ))
);

export default Map;
