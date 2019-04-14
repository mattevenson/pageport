import React from "react";
import { Marker } from "react-map-gl";
import { Button, Popover, Badge } from "antd";
import PageContent from "./PageContent";
import PageTitle from "./PageTitle";

interface IProps {
  latitude: number;
  longitude: number;
  name: string;
  src: string;
  description: string;
  id: number;
  utc?: number;
  tz: string;
}

const Pin: React.SFC<IProps> = ({
  latitude,
  longitude,
  name,
  src,
  description,
  id,
  utc,
  tz
}) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={-20}
      offsetTop={-20}
    >
      <Popover
        content={
          <PageContent
            tz={tz}
            id={id}
            src={src}
            description={description}
            utc={utc}
          />
        }
        trigger="click"
        title={<PageTitle name={name} />}
      >
        <Badge
          count={0}
          style={{ backgroundColor: "#108ee9" }}
          offset={[-5, 5]}
        >
          <Button
            size="large"
            shape="circle"
            icon="home"
            type={utc && utc < new Date().getTime() ? "primary" : "default"}
          />
        </Badge>
      </Popover>
    </Marker>
  );
};

export default Pin;
