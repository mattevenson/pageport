import React from "react";
import { Drawer, DatePicker, Timeline } from "antd";
import { observer, inject } from "mobx-react";
import { Store } from "../store";

const { RangePicker } = DatePicker;

interface IProps {
  store?: Store;
}

const ItineraryDrawer: React.SFC<IProps> = ({ store }) => (
  <Drawer
    visible={store!.drawer}
    mask={false}
    width={300}
    closable={false}
    placement="left"
  >
    <RangePicker
      onChange={dates => {
        if (dates && dates.length == 2) {
          store!.setRange([
            dates[0]!.toDate().getTime(),
            dates[1]!.toDate().getTime()
          ]);
        } else {
          store!.setRange(undefined);
        }
      }}
    />
    {store!.range ? (
      <Timeline>
        {store!.pagesWithDates.map(page => (
          <Timeline.Item key={page.id}>{page.name}</Timeline.Item>
        ))}
      </Timeline>
    ) : null}
  </Drawer>
);

export default inject("store")(observer(ItineraryDrawer));
