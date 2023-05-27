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
import { IData } from ".";
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
import { updateTicketPackage } from "../../modules/ticketPackages/actions";
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

interface IModalUpdate {
  open: boolean;
  onCancel: () => void;
}

const ModalUpdate: React.FC<
  {
    record: IData;
  } & IModalUpdate
> = ({ record, open, onCancel }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.ticketPackage
  );

  const [code, setCode] = React.useState(record.packageCode);
  const [name, setName] = React.useState(record.packageName);
  const [price, setPrice] = React.useState("");
  const [comboPrice, setComboPrice] = React.useState("");
  const [comboNumber, setComboNumber] = React.useState("");
  const [selected, setSelected] = React.useState(record.status);
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

  const formatter = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const applicableTimeDefault = formatter.format(
    new Date(record.applicableDate)
  );
  const expiredTimeDefault = formatter.format(new Date(record.expiredDate));

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

  const onchangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
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

  const handleAddTicketPackage = (id: string) => {
    if (!name) {
      message.warning("Chưa nhập tên gói vé!");
      return;
    }

    let applicableDateTime: string | undefined;
    let expiredDateTime: string | undefined;

    if (applicableDate && applicableTime) {
      const combinedApplicableDateTime = applicableDate
        .set("hour", applicableTime.hour())
        .set("minute", applicableTime.minute())
        .set("second", applicableTime.second());
      applicableDateTime = combinedApplicableDateTime.toString();
    }

    if (expiredDate && expiredTime) {
      const combinedExpiredDateTime = expiredDate
        .set("hour", expiredTime.hour())
        .set("minute", expiredTime.minute())
        .set("second", expiredTime.second());
      expiredDateTime = combinedExpiredDateTime.toString();
    }

    try {
      dispatch(
        updateTicketPackage(id, {
          packageCode: id,
          packageName: name,
          applicableDate: applicableDateTime || record.applicableDate,
          expiredDate: expiredDateTime || record.expiredDate,
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
  };

  const handleOk = () => {
    handleAddTicketPackage(code);
  };

  return (
    <ModalComponent
      centered
      width={758}
      open={open}
      onCancel={onCancel}
      onOK={handleOk}
      closable={false}
      className="modal-service"
      title={
        <Typography.Text className="gray-brown bold-24 text-normal">
          Cập nhật thông tin gói vé
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
        <Space size={66}>
          <Row>
            <Col>
              <Typography.Text className="text-normal semibold-16 gray-brown opacity-7">
                Mã gói{" "}
                <Typography.Text className="text-normal semibold-16 end">
                  *
                </Typography.Text>
              </Typography.Text>
              <Input
                name="code"
                value={code}
                className="text-normal medium-16 gray-brown opacity-7 input-modal"
                style={{ width: 245 }}
                placeholder="Nhập mã sự kiện"
                required
                readOnly
                onChange={onchangeCode}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography.Text className="text-normal semibold-16 gray-brown opacity-7">
                Tên gói vé
              </Typography.Text>
              <Input
                name="name"
                autoComplete="off"
                className="text-normal medium-16 gray-brown opacity-7 input-modal"
                style={{ width: 367 }}
                placeholder="Nhập tên gói vé"
                required
                value={name}
                onChange={onchangeName}
              />
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
                <DatePickerCustom
                  defaultValue={dayjs(record.applicableDate)}
                  onchange={onChangeApplicableDate}
                />
                <TimePicker
                  value={
                    applicableTime
                      ? applicableTime
                      : dayjs(`${applicableTimeDefault}`, "HH:mm:ss")
                  }
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
                <DatePickerCustom
                  defaultValue={dayjs(record.expiredDate)}
                  onchange={onChangeExpiredDate}
                />
                <TimePicker
                  value={
                    expiredTime
                      ? expiredTime
                      : dayjs(`${expiredTimeDefault}`, "HH:mm:ss")
                  }
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
                  defaultValue={record.status}
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

export default ModalUpdate;
