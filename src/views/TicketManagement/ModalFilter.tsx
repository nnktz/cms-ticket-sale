import React, { useState } from "react";
import ModalComponent from "../../shared/components/Modal";
import {
  Checkbox,
  Col,
  DatePickerProps,
  Form,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import "../styles/TicketManagement.css";
import ButtonComponent from "../../shared/components/ButtonComponent";
import DatePickerCustom from "../../shared/components/DatePicker/DatePickerCustom";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface IModalFilter {
  open: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const ModalFilter: React.FC<IModalFilter> = (props) => {
  const [selectAll, setSelectAll] = useState(false);

  const onChangeDateFrom: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeDateTo: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    setSelectAll(e.target.checked);
  };

  return (
    <ModalComponent
      open={props.open}
      onCancel={props.onCancel}
      closable={false}
      footer={false}
      className="modal-ticket modal-filter"
      title={
        <Typography.Text className="gray-brown bold-24 text-normal">
          Lọc vé
        </Typography.Text>
      }
    >
      <Form onFinish={props.onSave} className="modal-container-filter">
        <Space direction="vertical" size={0}>
          <Space size={122}>
            <Form.Item label="" name="dateFrom">
              <Col>
                <Row>
                  <Typography.Text className="gray-brown semibold-16 text-normal opacity-7">
                    Từ ngày
                  </Typography.Text>
                </Row>
                <Row>
                  <DatePickerCustom onchange={onChangeDateFrom} />
                </Row>
              </Col>
            </Form.Item>
            <Form.Item label="" name="dateTo">
              <Col>
                <Row>
                  <Typography.Text className="gray-brown semibold-16 text-normal opacity-7">
                    Đến ngày
                  </Typography.Text>
                </Row>
                <Row>
                  <DatePickerCustom onchange={onChangeDateTo} />
                </Row>
              </Col>
            </Form.Item>
          </Space>

          <Form.Item label="" name="status">
            <Col>
              <Row>
                <Typography.Text className="gray-brown semibold-16 text-normal opacity-7">
                  Tình trạng sử dụng
                </Typography.Text>
              </Row>
              <Row>
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Space size={40}>
                    <Radio value={1} className="radio">
                      <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                        Tất cả
                      </Typography.Text>
                    </Radio>
                    <Radio value={2} className="radio">
                      <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                        Đã sử dụng
                      </Typography.Text>
                    </Radio>
                    <Radio value={3} className="radio">
                      <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                        Chưa sử dụng
                      </Typography.Text>
                    </Radio>
                    <Radio value={4} className="radio">
                      <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                        Hết hạn
                      </Typography.Text>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Row>
            </Col>
          </Form.Item>

          <Form.Item label="" name="gate">
            <Col>
              <Row>
                <Typography.Text className="gray-brown semibold-16 text-normal opacity-7">
                  Cổng Check - in
                </Typography.Text>
              </Row>
              <Row>
                <Checkbox.Group>
                  <Row gutter={[12, 14]}>
                    <Col span={8}>
                      <Checkbox
                        value="all"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      >
                        <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                          Tất cả
                        </Typography.Text>
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="gate1" disabled={selectAll}>
                        <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                          Cổng 1
                        </Typography.Text>
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="gate2" disabled={selectAll}>
                        <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                          Cổng 2
                        </Typography.Text>
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="gate3" disabled={selectAll}>
                        <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                          Cổng 3
                        </Typography.Text>
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="gate4" disabled={selectAll}>
                        <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                          Cổng 4
                        </Typography.Text>
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="gate5" disabled={selectAll}>
                        <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                          Cổng 5
                        </Typography.Text>
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Row>
            </Col>
          </Form.Item>
          <ButtonComponent
            className="button-no-background bold-18 text-normal yellow-1"
            text="Lọc"
            type="submit"
            style={{ width: 160 }}
          />
        </Space>
      </Form>
    </ModalComponent>
  );
};

export default ModalFilter;
