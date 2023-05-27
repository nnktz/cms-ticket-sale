import { Menu } from "antd";
import items from "./itemMenu";
import "../styles.css";
import LogoImage from "../../shared/assets/images/insight-logo.png";
import ImageComponent from "../../shared/components/ImageComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SiderComponent: React.FC = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleMenuSelect = ({ key }: any) => {
    setSelectedKey(key);
  };

  useEffect(() => {
    const path = location.pathname;
    const key = path.slice(1);
    setSelectedKey(key);
  }, [location]);

  return (
    <div className="sidebar-container">
      <ImageComponent width={133} height={58} src={LogoImage} />

      <Menu
        className="sidebar-content"
        defaultOpenKeys={["settings"]}
        mode="inline"
        items={items}
        selectedKeys={selectedKey ? [selectedKey] : undefined}
        onSelect={handleMenuSelect}
      />
    </div>
  );
};

export default SiderComponent;
