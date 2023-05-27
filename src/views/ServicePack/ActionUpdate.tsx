import { useState } from "react";
import ButtonComponent from "../../shared/components/ButtonComponent";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import ModalUpdate from "./ModalUpdate";

const ActionUpdate = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <ButtonComponent
        icon={<EditOutlined style={{ fontSize: 24 }} />}
        text="Cập nhật"
        className="button-no-background medium-14 text-normal yellow-1"
        style={{ border: "none", boxShadow: "none" }}
        onClick={showModal}
      />
      <ModalUpdate
        record={props.record}
        open={isModalVisible}
        onCancel={closeModal}
      />
    </>
  );
};

export default ActionUpdate;
