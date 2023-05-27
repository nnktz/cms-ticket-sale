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
  message,
} from "antd";
import ModalComponent from "../../shared/components/Modal";
import "../styles/ServicePack.css";
import type { Dayjs } from "dayjs";
import DatePickerCustom from "../../shared/components/DatePicker/DatePickerCustom";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import SelectComponent from "../../shared/components/SelectComponent";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { RootState, useAppDispatch } from "../../core/store/redux";
import { useSelector } from "react-redux";
import { addTicketPackage } from "../../modules/ticketPackages/actions";
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
}

const ModalAdd: React.FC<IModalAdd> = ({ open, onCancel }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.ticketPackage
  );

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [comboPrice, setComboPrice] = React.useState("");
  const [comboNumber, setComboNumber] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [priceChecked, setPriceChecked] = React.useState(false);
  const [comboChecked, setComboChecked] = React.useState(false);
  const [applicableDate, setApplicableDate] = React.useState<Dayjs | null>(
    null
  );
  const [expiredDate, setExpiredDate] = React.useState<Dayjs | null>(null);
  const [applicableTime, setApplicableTime] = React.useState<Dayjs | null>(
    null
  );
  const [expiredTime, setExpiredTime] = React.useState<Dayjs | null>(null);

  const onChangeApplicableDate: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    if (date) {
      const applicableDate = dayjs(date);
      setApplicableDate(applicableDate);
    }
  };

  const onChangeExpiredDate: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    if (date) {
      const expiredDate = dayjs(date).startOf("day");
      setExpiredDate(expiredDate);
    }
  };

  const onChangeApplicableTime = (time: Dayjs | null) => {
    setApplicableTime(time);
  };

  const onChangeExpiredTime = (time: Dayjs | null) => {
    setExpiredTime(time);
  };

  const onChangePriceCheckbox = (e: CheckboxChangeEvent) => {
    setPriceChecked(e.target.checked);
  };

  const onChangeComboCheckbox = (e: CheckboxChangeEvent) => {
    setComboChecked(e.target.checked);
  };

  const handleChangeSelect = (value: string) => {
    setSelected(value);
  };

  const onchangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onchangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const onchangeComboPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComboPrice(event.target.value);
  };

  const onchangeComboNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComboNumber(event.target.value);
  };

  const handleAddTicketPackage = () => {
    if (name) {
      if (expiredDate && expiredTime && applicableDate && applicableTime) {
        const combinedExpiredDateTime = expiredDate
          .set("hour", expiredTime.hour())
          .set("minute", expiredTime.minute())
          .set("second", expiredTime.second());
        const combinedApplicableDateTime = applicableDate
          .set("hour", applicableTime.hour())
          .set("minute", applicableTime.minute())
          .set("second", applicableTime.second());
        try {
          dispatch(
            addTicketPackage({
              packageName: name,
              applicableDate: combinedApplicableDateTime.toString(),
              expiredDate: combinedExpiredDateTime.toString(),
              price: priceChecked ? price : null,
              comboPrice: comboChecked ? comboPrice : null,
              comboTicketNumber: comboChecked ? Number(comboNumber) : null,
              status: selected,
            })
          );
          setTimeout(() => window.location.reload(), 1000);
        } catch (err) {
          message.error(error);
        }
      } else {
        message.warning("Chưa chọn ngày hoặc thời gian!");
      }
    } else {
      message.warning("Chưa nhập tên gói vé!");
    }
  };

  return (
    <ModalComponent
      centered
      width={758}
      open={open}
      onCancel={onCancel}
      onOK={handleAddTicketPackage}
      closable={false}
      className="modal-service"
      title={
        <Typography.Text className="gray-brown bold-24 text-normal">
          Thêm gói vé
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
                  name="name"
                  autoComplete="off"
                  className="text-normal medium-16 gray-brown opacity-7 input-modal"
                  style={{ width: 367 }}
                  placeholder="Nhập tên gói vé"
                  required
                  onChange={onchangeName}
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
            <Checkbox className="checkbox" onChange={onChangePriceCheckbox}>
              <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
                Vé lẻ (vnđ/vé) với giá
              </Typography.Text>
            </Checkbox>
            <Input
              name="price"
              className="text-normal medium-16 gray-brown opacity-7 input-modal input-price"
              style={{ width: 148 }}
              placeholder="Giá vé"
              onChange={onchangePrice}
            />
            <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
              / vé
            </Typography.Text>
          </Space>
          <Space>
            <Checkbox className="checkbox" onChange={onChangeComboCheckbox}>
              <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
                Combo vé với giá
              </Typography.Text>
            </Checkbox>
            <Input
              name="comboPrice"
              className="text-normal medium-16 gray-brown opacity-7 input-modal input-price"
              style={{ width: 148 }}
              placeholder="Giá vé"
              onChange={onchangeComboPrice}
            />
            <Typography.Text className="text-normal medium-16 gray-brown opacity-7">
              /
            </Typography.Text>
            <Input
              name="comboNumber"
              className="text-normal medium-16 gray-brown opacity-7 input-modal input-price"
              style={{ width: 72 }}
              placeholder="Số vé"
              onChange={onchangeComboNumber}
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
