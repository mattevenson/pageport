import React from "react";
import { Button, Row, Col } from "antd";

interface IProps {
  name: string;
}

const PageTitle: React.SFC<IProps> = ({ name }) => (
  <Row type="flex" justify="space-between">
    <Col style={{ marginRight: 24 }}>{name}</Col>
  </Row>
);

export default PageTitle;
