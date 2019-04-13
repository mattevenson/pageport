import React, { useState } from "react";
import { Modal, Icon, Calendar, TimePicker, Steps } from "antd";
import moment from "moment";
import { ModalProps } from "antd/lib/modal";

interface IProps extends ModalProps {
  id: number;
}

const VisitsModal: React.SFC<IProps> = ({ onOk, ...props }) => {
  const [current, setCurrent] = useState(0);
  const [date, setDate] = useState(moment());
  const [completed, setCompleted] = useState(false);

  return (
    <Modal
      {...props}
      onOk={completed ? onOk : undefined}
      okType={completed ? "primary" : "dashed"}
    >
      <Steps current={current}>
        <Steps.Step title="Date" icon={<Icon type="calendar" />} />
        <Steps.Step title="Date" icon={<Icon type="clock-circle" />} />
      </Steps>
      {current == 0 ? (
        <Calendar
          value={date}
          fullscreen={false}
          style={{ width: 200 }}
          onSelect={d => {
            setDate(
              date
                .month(d!.month())
                .day(d!.day())
                .year(d!.year())
            );
            setCurrent(1);
          }}
        />
      ) : (
        <TimePicker
          use12Hours={true}
          format="HH:mm a"
          onChange={t => {
            if (t) {
              setDate(date.hour(t!.hour()).minute(t!.minute()));
              setCompleted(true);
            } else {
              setCompleted(false);
            }
          }}
        />
      )}
    </Modal>
  );
};

export default VisitsModal;
