import { MenuProps } from "antd";
import React from "react";

export default interface IDropdown {
  placement?:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "top"
    | "bottom";
  menuDropdown: MenuProps;
  className?: string;
  children?: React.ReactNode;
  trigger: "contextMenu" | "click" | "hover";
}
