import React from "react";
import { Marker } from "react-map-gl";
import { Button, Popover } from "antd";
import PageContent from "./PageContent";
import PageTitle from "./PageTitle";

interface IProps {
  latitude: number;
  longitude: number;
  name: string;
  src: string;
  description: string;
  id: number;
  date?: Date;
  tz: string;
}

const Pin: React.SFC<IProps> = ({
  latitude,
  longitude,
  name,
  src,
  description,
  id,
  date,
  tz
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <Popover
        content={
          <PageContent
            tz={tz}
            id={id}
            src={src}
            description={description}
            date={date}
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
