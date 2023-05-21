import Dropdown from "antd/es/dropdown";
import React from "react";
import IDropdown from "./interface";

const DropDownComponent: React.FC<IDropdown> = (props) => {
  return (
    <Dropdown
      arrow
      destroyPopupOnHide
      menu={props.menuDropdown}
      placement={props.placement}
      className={props.className}
      trigger={[props.trigger]}
    >
      {props.children}
    </Dropdown>
  );
};

export default DropDownComponent;
