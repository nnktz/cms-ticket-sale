import Tag from "antd/es/tag";
import React from "react";

interface ITag {
  className?: string;
  color: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const TagComponent: React.FC<ITag> = (props) => {
  return (
    <Tag
      className={props.className}
      color={props.color}
      style={props.style}
      bordered
    >
      {props.children}
    </Tag>
  );
};

export default TagComponent;
