import { Button } from "antd";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonComponent = (props: ButtonProps) => {
  return (
    <Button
      type="primary"
      icon={props.icon}
      size="large"
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
