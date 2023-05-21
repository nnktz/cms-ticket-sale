import { MenuProps, Typography, message } from "antd";
import "../../styles/TicketManagement.css";
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import { useState } from "react";
import ModalTicket from "./ModalTicket";
import DropDownComponent from "../../../shared/components/DropDownComponent";

const ActionFilter = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Typography.Text className="medium-14 text-normal gray-brown">
          Sử dụng vé
        </Typography.Text>
      ),
    },
    {
      key: "2",
      label: (
        <Typography.Text
          className="medium-14 text-normal gray-brown"
          onClick={showModal}
        >
          Đổi ngày sử dụng
        </Typography.Text>
      ),
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <DropDownComponent
        placement="bottomRight"
        menuDropdown={menuProps}
        trigger="click"
      >
        <MoreOutlined className="i-more flex-center" />
      </DropDownComponent>
      <ModalTicket
        record={props.record}
        open={isModalVisible}
        onOK={closeModal}
        onCancel={closeModal}
      />
    </>
  );
};

export default ActionFilter;
