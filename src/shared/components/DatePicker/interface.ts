import { DatePickerProps } from "antd";

export default interface IDatePicker {
  onchange: DatePickerProps["onChange"];
  defaultValue?: any;
}
