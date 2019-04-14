import React from "react";
import { Drawer, DatePicker, Timeline } from "antd";

const { RangePicker } = DatePicker;

const ItineraryDrawer = () => (
  <Drawer visible mask={false} width={300} closable={false} placement="left">
    <RangePicker />
    <Timeline />
  </Drawer>
);

export default ItineraryDrawer;
