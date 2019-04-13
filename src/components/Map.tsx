import React from "react";
import ReactMapGL from "react-map-gl";
import ReactResizeDetector from "react-resize-detector";
import { observer, inject } from "mobx-react";
import { FacebookStore } from "../stores/facebookStore";

interface IProps {
  facebookStore?: FacebookStore;
}

const Map: React.SFC<IProps> = inject("facebookStore")(
  observer(({ children, facebookStore }) => (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <ReactMapGL
        width="100%"
        height="100%"
        mapboxApiAccessToken="pk.eyJ1IjoibWF0dGV2ZW5zb24iLCJhIjoiY2p1ZjRza3B6MGFoNjRmcGptZzJicmswaiJ9.XdKarNxE21bMkSSt6HuFAA"
      >
        <p>{JSON.stringify(facebookStore!.pages)}</p>
        {children}
      </ReactMapGL>
    </div>
  ))
);

export default inject("facebookStore")(observer(Map));
