import { Button } from "antd";
import { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
}

const ButtonComponent = (props: ButtonProps) => {
  return (
    <Button
      loading={props.loading}
      type="primary"
      htmlType={props.htmlType}
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
