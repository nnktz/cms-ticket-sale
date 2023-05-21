import Modal from "antd/es/modal/Modal";
import React from "react";
import IModal from "./interface";

const ModalComponent: React.FC<IModal> = (props) => {
  return (
    <Modal
      open={props.open}
      onOk={props.onOK}
      onCancel={props.onCancel}
      title={props.title}
      className={props.className}
      style={props.style}
      footer={props.footer}
      centered={props.centered}
      closable={props.closable}
      width={props.width}
      okText={props.okText}
      cancelText={props.cancelText}
      cancelButtonProps={{ style: props.cancelStyle }}
      okButtonProps={{ style: props.okStyle }}
    >
      {props.children}
    </Modal>
  );
};

export default ModalComponent;
