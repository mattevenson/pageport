import React, { useState } from "react";
import { Marker } from "react-map-gl";
import { Button, Typography, Popover } from "antd";
import PageContent from "./PageContent";
import PageTitle from "./PageTitle";

interface IProps {
  latitude: number;
  longitude: number;
  name: string;
  src: string;
  description: string;
  id: number;
}

const Pin: React.SFC<IProps> = ({
  latitude,
  longitude,
  name,
  src,
  description,
  id
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <Popover
        content={<PageContent id={id} src={src} description={description} />}
        trigger="click"
        title={<PageTitle name={name} />}
      >
        <Button size="large" shape="circle" icon="home" />
      </Popover>
    </Marker>
  );
};

export default Pin;
