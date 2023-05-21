import React from "react";
import ModalComponent from "../../../shared/components/Modal";
import { DatePickerProps, Space, Typography } from "antd";
import "../../styles/TicketManagement.css";
import { IData } from ".";
import DatePickerCustom from "../../../shared/components/DatePicker/DatePickerCustom";

const buttonStyle: React.CSSProperties = {
  width: 160,
  height: 48,
};

const okButtonStyle: React.CSSProperties = {
  background: "#FF993C",
  borderRadius: "8px",
};

const cancelButtonStyle: React.CSSProperties = {
  borderRadius: "10px",
  border: "1px solid #FF993C",
};

interface IModalTicket {
  open: boolean;
  onCancel: () => void;
  onOK: () => void;
}

const ModalTicket: React.FC<
  {
    record: IData;
  } & IModalTicket
> = ({ record, open, onCancel, onOK }) => {
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <ModalComponent
      centered
      width={758}
      open={open}
      onCancel={onCancel}
      onOK={onOK}
      closable={false}
      className="modal-ticket"
      title={
        <Typography.Text className="gray-brown bold-24 text-normal">
          Đổi ngày sử dụng vé
        </Typography.Text>
      }
      okText={
        <Typography.Text className="white bold-18 text-normal">
          Lưu
        </Typography.Text>
      }
      cancelText={
        <Typography.Text className="yellow-1 bold-18 text-normal">
          Huỷ
        </Typography.Text>
      }
      cancelStyle={{ ...cancelButtonStyle, ...buttonStyle }}
      okStyle={{ ...okButtonStyle, ...buttonStyle }}
    >
      <Space size={17} className="modal-container" direction="vertical">
        <Space size={140}>
          <Typography.Text className="semibold-16 text-normal gray-brown opacity-7">
            Số vé
          </Typography.Text>
          <Typography.Text className="medium-16 text-normal gray-brown opacity-7">
            {record.ticketNumber}
          </Typography.Text>
        </Space>
        <Space size={127}>
          <Typography.Text className="semibold-16 text-normal gray-brown opacity-7">
            Loại vé
          </Typography.Text>
          <Typography.Text className="medium-16 text-normal gray-brown opacity-7">
            Vé cổng - Gói gia đình
          </Typography.Text>
        </Space>
        <Space size={90}>
          <Typography.Text className="semibold-16 text-normal gray-brown opacity-7">
            Hạn sử dụng
          </Typography.Text>
          <DatePickerCustom onchange={onChangeDate} />
        </Space>
      </Space>
    </ModalComponent>
  );
};

export default ModalTicket;
