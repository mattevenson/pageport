import React from "react";
import ReactMapGL from "react-map-gl";
import ReactResizeDetector from "react-resize-detector";

const Map: React.SFC = ({ children }) => (
  <div style={{ width: "100%", height: "100%", position: "absolute" }}>
    <ReactResizeDetector
      handleHeight
      handleWidth
      render={({ width, height }) => (
        <ReactMapGL
          width={width}
          height={height}
          mapboxApiAccessToken="pk.eyJ1IjoibWF0dGV2ZW5zb24iLCJhIjoiY2p1ZjRza3B6MGFoNjRmcGptZzJicmswaiJ9.XdKarNxE21bMkSSt6HuFAA"
        >
          {children}
        </ReactMapGL>
      )}
    />
  </div>
);

export default Map;
