import React, { useState } from "react";
import { Marker } from "react-map-gl";
import { Button, Typography, Popover } from "antd";
import PageContent from "./PageContent";
import PageTitle from "./PageTitle";
import { Visit } from "../store";

interface IProps {
  latitude: number;
  longitude: number;
  name: string;
  src: string;
  description: string;
  id: number;
  visit?: Visit;
}

const Pin: React.SFC<IProps> = ({
  latitude,
  longitude,
  name,
  src,
  description,
  id,
  visit
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <Popover
        content={
          <PageContent
            id={id}
            src={src}
            description={description}
            visit={visit}
          />
        }
        trigger="click"
        title={<PageTitle name={name} />}
      >
        <Button size="large" shape="circle" icon="home" />
      </Popover>
    </Marker>
  );
};

export default Pin;
