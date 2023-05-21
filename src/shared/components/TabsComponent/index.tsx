import Tabs from "antd/es/tabs";
import React from "react";
import { ITabs } from "./interface";
import "./styles.css";

const TabsComponent: React.FC<ITabs> = (props) => {
  return (
    <Tabs
      defaultActiveKey={props.defaultKey}
      items={props.items}
      onChange={props.onChange}
    />
  );
};

export default TabsComponent;
