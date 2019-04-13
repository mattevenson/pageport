import React, { useState } from "react";
import { Button, Tooltip, Avatar, Row, Modal } from "antd";
import VisitsModal from "./VisitsModal";
import { Visit } from "../store";

interface IProps {
  id: number;
  src: string;
  description: string;
  visit?: Visit;
}

const PageContent: React.SFC<IProps> = ({ src, id, visit }) => {
  const [visible, setVisible] = useState(false);
  return (
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
          <Button
            onClick={() => setVisible(true)}
            shape="circle"
            type="primary"
            icon="calendar"
          />
        </Tooltip>
      </Row>
      <VisitsModal
        id={id}
        visible={visible}
        setVisible={setVisible}
        visit={visit}
      />
    </div>
  );
};

export default PageContent;
