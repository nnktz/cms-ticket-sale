import { TabsProps } from "antd/es/tabs";

export interface ITabs {
  classNames?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
  defaultKey?: string;
  activeKey?: string;
  items: TabsProps["items"];
}
