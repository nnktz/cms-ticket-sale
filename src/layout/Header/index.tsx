import { Space } from "antd";
import SearchComponent from "../../shared/components/SearchComponent";
import { useState } from "react";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import "../styles.css";
import { BellOutlined, MailOutlined } from "@ant-design/icons";
import ImageComponent from "../../shared/components/ImageComponent";
import Avatar from "../../shared/assets/images/Frame-54-Avatar.png";

const iconHeader = {
  fontSize: "24px",
  color: "#1E0D03",
} as React.CSSProperties;

const HeaderComponent = () => {
  const [valueSearch, setValueSearch] = useState("");

  const searchHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(value);
  };

  return (
    <div className="header-container">
      <SearchComponent
        classNames="search-bar text-italic italic-16 gray-brown"
        value={valueSearch}
        name="searchBar"
        placeholder="Search"
        onChange={searchHandler}
        iconSuffix={<SearchOutlined style={iconHeader} />}
      />

      <Space size={29}>
        <MailOutlined style={iconHeader} />
        <BellOutlined style={iconHeader} />
        <ImageComponent width={48} height={48} src={Avatar} />
      </Space>
    </div>
  );
};

export default HeaderComponent;
