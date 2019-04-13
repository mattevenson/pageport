import React, { useState } from "react";
import { Marker } from "react-map-gl";
import { Button, Typography, Popover } from "antd";

interface IProps {
  latitude: number;
  longitude: number;
  name: string;
}

const content = (name: string) => <div>{name}</div>;

const Pin: React.SFC<IProps> = ({ latitude, longitude, name }) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <Popover content={content(name)} trigger="focus">
        <Button size="large" shape="circle" icon="home" />
      </Popover>
    </Marker>
  );
};

export default Pin;
