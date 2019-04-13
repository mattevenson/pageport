import React, { useState } from "react";
import { Marker } from "react-map-gl";
import { Avatar, Typography } from "antd";

interface IProps {
  latitude: number;
  longitude: number;
  name: string;
}

const Pin: React.SFC<IProps> = ({ latitude, longitude, name }) => {
  const [hover, setHover] = useState(false);
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          size="large"
          style={{
            marginRight: 5
          }}
        >
          {name[0]}
        </Avatar>
        {hover ? (
          <Typography.Title level={4} style={{ position: "relative", top: 5 }}>
            {name}
          </Typography.Title>
        ) : null}
      </div>
    </Marker>
  );
};

export default Pin;
