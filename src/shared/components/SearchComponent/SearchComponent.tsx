import { ISearch } from "./interface";
import { Input } from "antd";

const SearchComponent = (props: ISearch) => {
  return (
    <Input
      autoComplete="off"
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      placeholder={props.placeholder}
      suffix={props.iconSuffix}
      style={props.style}
      className={props.classNames}
      allowClear={props.clear}
    />
  );
};

export default SearchComponent;
