import { Menu } from "antd";
import items from "./itemMenu";
import "../styles.css";
import LogoImage from "../../shared/assets/images/insight-logo.png";
import ImageComponent from "../../shared/components/ImageComponent";

const SiderComponent: React.FC = () => {
  return (
    <div className="sidebar-container">
      <ImageComponent width={133} height={58} src={LogoImage} />

      <Menu
        className="sidebar-content"
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={["settings"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default SiderComponent;
