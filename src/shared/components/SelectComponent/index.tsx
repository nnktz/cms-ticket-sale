import { Select } from "antd";
import React from "react";

interface IOption {
  value: string;
  label: string;
}

interface ISelect {
  options: IOption[];
  onchange: (value: string) => void;
  clear?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

const SelectComponent: React.FC<ISelect> = (props) => {
  return (
    <Select
      defaultValue={props.defaultValue}
      allowClear={props.clear}
      style={props.style}
      onChange={props.onchange}
      placeholder={props.placeholder}
      className={props.className}
      options={props.options}
    />
  );
};

export default SelectComponent;
