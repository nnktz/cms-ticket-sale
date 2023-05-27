import { MenuProps, Typography, message } from "antd";
import "../../styles/TicketManagement.css";
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import { useState } from "react";
import ModalTicket from "./ModalTicket";
import DropDownComponent from "../../../shared/components/DropDownComponent";
import { IData } from ".";
import { RootState, useAppDispatch } from "../../../core/store/redux";
import { updateFamilyTicket } from "../../../modules/ticketManagement/actions";
import { useSelector } from "react-redux";

const ActionFilter = ({ record }: { record: IData }) => {
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.ticketManagement);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  const handleUseTicket = (id: string) => {
    try {
      dispatch(updateFamilyTicket(id, { usageStatus: "finished" }));
    } catch (err) {
      message.error(error);
    }
  };

  const handleUpdate = () => {
    handleUseTicket(record.bookingCode);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Typography.Text className="medium-14 text-normal gray-brown">
          Sử dụng vé
        </Typography.Text>
      ),
      onClick: handleUpdate,
    },
    {
      key: "2",
      label: (
        <Typography.Text className="medium-14 text-normal gray-brown">
          Đổi ngày sử dụng
        </Typography.Text>
      ),
      onClick: showModal,
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
        record={record}
        open={isModalVisible}
        onCancel={closeModal}
      />
    </>
  );
};

export default ActionFilter;
