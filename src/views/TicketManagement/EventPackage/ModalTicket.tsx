import React from "react";
import ModalComponent from "../../../shared/components/Modal";
import { DatePickerProps, Space, Typography, message } from "antd";
import "../../styles/TicketManagement.css";
import { IData } from ".";
import DatePickerCustom from "../../../shared/components/DatePicker/DatePickerCustom";
import { RootState, useAppDispatch } from "../../../core/store/redux";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { updateEventTicket } from "../../../modules/ticketManagement/actions";

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
}

const ModalTicket: React.FC<
  {
    record: IData;
  } & IModalTicket
> = ({ record, open, onCancel }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.ticketManagement
  );
  const [usedDate, setUsedDate] = React.useState<Dayjs | null>(null);
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      const usedDate = dayjs(date);
      setUsedDate(usedDate);
    }
  };

  const handleChangeDate = (id: string) => {
    const date = usedDate?.toString();
    if (!date || date === record.usedDate) {
      message.warning("Chưa có sự thay đổi ngày");
      return;
    }

    try {
      dispatch(updateEventTicket(id, { usedDate: date }));
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      message.error(error);
    }
  };

  const handleOk = () => {
    handleChangeDate(record.bookingCode);
  };

  return (
    <ModalComponent
      centered
      width={758}
      open={open}
      onCancel={onCancel}
      onOK={handleOk}
      closable={false}
      className="modal-ticket"
      title={
        <Typography.Text className="gray-brown bold-24 text-normal">
          Đổi ngày sử dụng vé
        </Typography.Text>
      }
      okText={
        <Typography.Text
          className="white bold-18 text-normal"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu"}
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
            Vé cổng - Gói sự kiện
          </Typography.Text>
        </Space>
        <Space size={99}>
          <Typography.Text className="semibold-16 text-normal gray-brown opacity-7">
            Tên sự kiện
          </Typography.Text>
          <Typography.Text className="medium-16 text-normal gray-brown opacity-7">
            {record.nameEvent}
          </Typography.Text>
        </Space>
        <Space size={90}>
          <Typography.Text className="semibold-16 text-normal gray-brown opacity-7">
            Hạn sử dụng
          </Typography.Text>
          <DatePickerCustom
            onchange={onChangeDate}
            defaultValue={
              record.usedDate !== "" ? dayjs(record.usedDate) : null
            }
          />
        </Space>
      </Space>
    </ModalComponent>
  );
};

export default ModalTicket;
