import React from "react";
import { Button, Row, Col } from "antd";

interface IProps {
  name: string;
  website?: string;
  link: string;
}

const PageTitle: React.SFC<IProps> = ({ name, website, link }) => (
  <Row type="flex" justify="space-between">
    <Col style={{ marginRight: 24 }}>{name}</Col>
    <Button
      shape="circle"
      size="small"
      icon="facebook"
      onClick={() => window.open(link, "_blank")}
      style={{ marginLeft: 8 }}
    />
    {website && (
      <Button
        shape="circle"
        size="small"
        icon="global"
        onClick={() => window.open(website, "_blank")}
        style={{ marginLeft: 8 }}
      />
    )}
  </Row>
);

export default PageTitle;
