import React, { useState } from "react";
import { Modal, Icon, Calendar, TimePicker, Steps } from "antd";
import moment from "moment";
import { ModalProps } from "antd/lib/modal";
import { visits, Visit } from "../store";

interface IProps extends ModalProps {
  id: number;
  setVisible: (visible: boolean) => void;
  visit?: Visit;
}

const VisitsModal: React.SFC<IProps> = ({
  onOk,
  setVisible,
  id,
  visit,
  ...props
}) => {
  const [current, setCurrent] = useState(0);
  const [date, setDate] = useState(moment());
  const [completed, setCompleted] = useState(false);

  return (
    <Modal
      {...props}
      onOk={
        completed
          ? async () => {
              setVisible(false);
              if (visit) {
                await visit.update({ date: date.toDate() });
              } else {
                visits.add({
                  id,
                  date: date.toDate()
                });
              }
              setCurrent(0);
            }
          : undefined
      }
      onCancel={() => setVisible(false)}
      okType={completed ? "primary" : "dashed"}
      zIndex={1031}
      closable={false}
    >
      <Steps current={current}>
        <Steps.Step title="Date" icon={<Icon type="calendar" />} />
        <Steps.Step title="Time" icon={<Icon type="clock-circle" />} />
      </Steps>
      {current == 0 ? (
        <Calendar
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
          format="hh:mm a"
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
