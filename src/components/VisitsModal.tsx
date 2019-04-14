import React, { useState } from "react";
import { Modal, Icon, Calendar, TimePicker, Steps } from "antd";
import { observer } from "mobx-react";
import moment from "moment";
import { ModalProps } from "antd/lib/modal";
import { visits } from "../store";

interface IProps extends ModalProps {
  id: number;
  setVisible: (visible: boolean) => void;
  date?: Date;
}

const VisitsModal: React.SFC<IProps> = ({
  onOk,
  date: d2,
  setVisible,
  id,
  ...props
}) => {
  return (
    <Modal
      {...props}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      zIndex={1031}
      closable={false}
    >
      <TimePicker
        use12Hours={true}
        format="MM-DD-YYYY hh:mm a"
        // defaultValue={date}
        onChange={t => {}}
      />
    </Modal>
  );
};

export default VisitsModal;
