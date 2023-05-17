import { Space, Typography } from "antd";
import "../styles.css";
import IHalfBox from "./interface";

const HalfBox: React.FC<IHalfBox> = ({ mainTitle, subTitle, children }) => {
  return (
    <Space className="box" align="start" size={24}>
      <div className="bg-white main-box">
        <div className="main-content">
          <Typography.Title
            id="h1"
            level={1}
            className="gray-brown text-normal bold-36"
          >
            {mainTitle}
          </Typography.Title>
          {children}
        </div>
      </div>
      <div className="bg-white sub-box">
        <div className="sub-content">
          <Typography.Title
            id="h3"
            level={3}
            className="gray-brown text-normal bold-24"
          >
            {subTitle}
          </Typography.Title>
          {children}
        </div>
      </div>
    </Space>
  );
};

export default HalfBox;
