import { Button } from "antd";
import { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

const ButtonComponent = (props: ButtonProps) => {
  return (
    <Button
      type="primary"
      htmlType={props.type}
      icon={props.icon}
      size="large"
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
