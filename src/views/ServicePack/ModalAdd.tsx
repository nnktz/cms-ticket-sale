import React from "react";
import {
  Checkbox,
  Col,
  DatePickerProps,
  Input,
  Row,
  Space,
  TimePicker,
  Typography,
} from "antd";
import ModalComponent from "../../shared/components/Modal";
import "../styles/ServicePack.css";
import type { Dayjs } from "dayjs";
import DatePickerCustom from "../../shared/components/DatePicker/DatePickerCustom";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import SelectComponent from "../../shared/components/SelectComponent";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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

interface IModalAdd {
  open: boolean;
  onCancel: () => void;
  onOK: () => void;
}

const ModalAdd: React.FC<IModalAdd> = ({ open, onCancel, onOK }) => {
  const [applicableTime, setApplicableTime] = React.useState<Dayjs | null>(
    null
  );
  const [expiredTime, setExpiredTime] = React.useState<Dayjs | null>(null);

  const onChangeApplicableDate: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
  };

  const onChangeExpiredDate: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
  };

  const onChangeApplicableTime = (time: Dayjs | null) => {
    setApplicableTime(time);
  };

  const onChangeExpiredTime = (time: Dayjs | null) => {
    setExpiredTime(time);
  };

  const onChangePrice = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <ModalComponent
      centered
      width={758}
      open={open}
      onCancel={onCancel}
      onOK={onOK}
      closable={false}
      className="modal-service"
      title={
        <Typography.Text className="gray-brown bold-24 text-normal">
          Thêm gói vé
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
      <Space size={32} direction="vertical">
        <Space>
          <Row>
            <Col>
              <Typography.Text className="text-normal semibold-16 gray-brown opacity-7">
                Tên gói vé{" "}
                <Typography.Text className="text-normal semibold-16 end">
                  *
                </Typography.Text>
              </Typography.Text>
              <div>
                <Input
                  className="text-normal medium-16 gray-brown opacity-7 input-modal"
                  style={{ width: 367 }}
                  placeholder="Nhập tên gói vé"
                  required
                />
              </div>
            </Col>
          </Row>
        </Space>
        <Space size={28}>
          <Row>
            <Col>
              <Typography.Text className="text-normal semibold-16 gray-brown opacity-7">
                Ngày áp dụng
              </Typography.Text>
              <div className="flex-center">
                <DatePickerCustom onchange={onChangeApplicableDate} />
                <TimePicker
                  value={applicableTime}
                  onChange={onChangeApplicableTime}
                  showNow={false}
                  allowClear={false}
                  placeholder="Chọn thời gian"
                  className="time"
                  style={{ marginLeft: 8 }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography.Text className="text-normal semibold-16 gray-brown opacity-7">
                Ngày hết hạn
              </Typography.Text>
              <div className="flex-center">
                <DatePickerCustom onchange={onChangeExpiredDate} />
                <TimePicker
                  value={expiredTime}
                  onChange={onChangeExpiredTime}
                  showNow={false}
                  allowClear={false}
                  placeholder="Chọn thời gian"
                  className="time"
                  style={{ marginLeft: 8 }}
                />
              </div>
            </Col>
          </Row>
        </Space>
        <Space direction="vertical">
          <Typography.Text className="text-normal semibold-16 gray-brown opacity-7">
            Giá vé áp dụng
          </Typography.Text>
          <Space>
            <Checkbox className="checkbox" onChange={onChangePrice}>
              <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
                Vé lẻ (vnđ/vé) với giá
              </Typography.Text>
            </Checkbox>
            <Input
              className="text-normal medium-16 gray-brown opacity-7 input-modal input-price"
              style={{ width: 148 }}
              placeholder="Giá vé"
              required
            />
            <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
              / vé
            </Typography.Text>
          </Space>
          <Space>
            <Checkbox className="checkbox">
              <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
                Combo vé với giá
              </Typography.Text>
            </Checkbox>
            <Input
              className="text-normal medium-16 gray-brown opacity-7 input-modal input-price"
              style={{ width: 148 }}
              placeholder="Giá vé"
              required
            />
            <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
              /
            </Typography.Text>
            <Input
              className="text-normal medium-16 gray-brown opacity-7 input-modal input-price"
              style={{ width: 72 }}
              placeholder="Giá vé"
              required
            />
            <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
              vé
            </Typography.Text>
          </Space>
        </Space>
        <Space>
          <Row>
            <Col>
              <Typography.Text className="text-normal semibold-16 gray-brown opacity-7">
                Tình trạng
              </Typography.Text>
              <div style={{ marginBottom: "16.5px" }}>
                <SelectComponent
                  className="select-status"
                  placeholder="Chọn trạng thái"
                  options={[
                    { value: "active", label: "Đang áp dụng" },
                    { value: "inactive", label: "Tắt" },
                  ]}
                  onchange={handleChangeSelect}
                />
              </div>
              <Typography.Text className="text-italic italic-12 end">
                *{" "}
                <Typography.Text className="gray-brown opacity-4 text-italic italic-12">
                  là thông tin bắt buộc
                </Typography.Text>
              </Typography.Text>
            </Col>
          </Row>
        </Space>
      </Space>
    </ModalComponent>
  );
};

export default ModalAdd;
