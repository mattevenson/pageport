import React from "react";
import {
  Row,
  Drawer,
  DatePicker,
  Timeline,
  Typography,
  Switch,
  Icon,
  Col
} from "antd";
import { observer, inject } from "mobx-react";
import { Store } from "../store";
import moment from "moment-timezone";

const { RangePicker } = DatePicker;

interface IProps {
  store?: Store;
}

const ItineraryDrawer: React.SFC<IProps> = ({ store }) => (
  <Drawer
    visible={store!.drawer}
    mask={false}
    width={300}
    closable={true}
    onClose={() => store!.toggleDrawer()}
    placement="left"
  >
    <Row
      type="flex"
      align="middle"
      justify="start"
      style={{ position: "relative", bottom: 6, marginBottom: 24 }}
    >
      <Icon
        type="retweet"
        style={{
          fontSize: 20,
          marginRight: 12
        }}
      />
      <Switch
        checked={store!.overlay}
        onChange={() => store!.toggleOverlay()}
      />
    </Row>
    <Typography.Title level={2} style={{ marginBottom: 20 }}>
      Schedule
    </Typography.Title>
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
    <Timeline style={{ marginTop: 30, marginLeft: 20 }}>
      {store!.pagesWithDates
        .filter(page => page.utc)
        .map(page => (
          <Timeline.Item
            color={page.utc! > new Date().getTime() ? "gray" : "blue"}
            key={page.id}
          >
            <a
              onClick={() =>
                store!.setViewport(
                  {
                    longitude: page.location!.longitude!,
                    latitude: page.location!.latitude!,
                    zoom: 14
                  },
                  true
                )
              }
              style={{ fontSize: 16 }}
            >
              {page.name}
            </a>
            <br />
            <Typography.Text>
              {moment(page.utc!)
                .tz(page.location!.tz!)
                .format("MM/DD/YYYY hh:mm A")}
            </Typography.Text>
          </Timeline.Item>
        ))}
    </Timeline>
  </Drawer>
);

export default inject("store")(observer(ItineraryDrawer));
