import { Typography } from "antd";
import "../styles.css";
import ILargeBox from "./interface";

const index: React.FC<ILargeBox> = ({ title, children, style }) => {
  return (
    <div className="bg-white box">
      <div className="main-content" style={style}>
        <Typography.Title
          id="h1"
          level={1}
          className="gray-brown text-normal bold-36"
        >
          {title}
        </Typography.Title>
        {children}
      </div>
    </div>
  );
};

export default index;
