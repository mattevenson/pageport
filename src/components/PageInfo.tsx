import React from "react";
import { Button, Tooltip, Avatar, Row, Typography } from "antd";

interface IProps {
  src: string;
  description: string;
}

const PageInfo: React.SFC<IProps> = ({ src, description }) => (
  <div>
    <Row type="flex" justify="center">
      <Avatar shape="circle" src={src} size={128} />
    </Row>
    <Row type="flex" justify="center">
      <Button shape="circle" size="small" icon="facebook" />
      <Button shape="circle" size="small" icon="global" />
    </Row>
    <Row type="flex" justify="center">
      <Tooltip title="Mark your visit" placement="right">
        <Button shape="circle" type="primary" icon="calendar" />
      </Tooltip>
    </Row>
  </div>
);

export default PageInfo;
