import React from "react";
import { observer } from "mobx-react";
import moment from "moment-timezone";
import { Button, Tooltip, Avatar, Row, DatePicker } from "antd";
import { visits } from "../store";

interface IProps {
  id: number;
  src: string;
  description: string;
  date?: Date;
  tz: string;
}

const PageContent: React.SFC<IProps> = ({ src, id, date, tz }) => {
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
        <DatePicker
          showTime={{ use12Hours: true, format: "hh:mm a" }}
          format="YYYY-MM-DD hh:mm a"
          defaultValue={date ? moment(date).tz(tz) : undefined}
          onChange={async d => {
            const visit = visits.docs.find(visit => visit.data.id === id);
            if (visit) {
              if (d) {
                await visit.update({ utc: d.toDate().getTime() });
              } else {
                await visit.delete();
              }
            } else {
              if (d) {
                await visits.add({ id, utc: d.toDate().getTime() });
              }
            }
          }}
        />
      </Row>
    </div>
  );
};

export default observer(PageContent);
