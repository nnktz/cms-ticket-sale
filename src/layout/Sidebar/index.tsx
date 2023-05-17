import { Menu } from "antd";
import items from "./itemMenu";
import "../styles.css";
import LogoImage from "../../shared/assets/images/insight-logo.png";
import ImageComponent from "../../shared/components/ImageComponent";
import { useEffect, useState } from "react";

const SiderComponent: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleMenuSelect = ({ key }: any) => {
    localStorage.setItem("selectedKey", key);
    setSelectedKey(key);
  };

  useEffect(() => {
    const storedKey = localStorage.getItem("selectedKey");
    if (storedKey) {
      setSelectedKey(storedKey);
    }
  }, []);

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
