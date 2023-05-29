import React from "react";
import "../../styles/TicketManagement.css";
import SearchComponent from "../../../shared/components/SearchComponent";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import {
  Checkbox,
  Col,
  DatePickerProps,
  Form,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import ButtonComponent from "../../../shared/components/ButtonComponent";
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";
import TableComponent from "../../../shared/components/TableComponent";
import columns from "./ColumnsData";
import _debounce from "lodash/debounce";
import { CSVLink } from "react-csv";
import { RootState, useAppDispatch } from "../../../core/store/redux";
import { useSelector } from "react-redux";
import { fetchEventTickets } from "../../../modules/ticketManagement/actions";
import ModalComponent from "../../../shared/components/Modal";
import DatePickerCustom from "../../../shared/components/DatePicker/DatePickerCustom";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/esm/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/esm/plugin/isSameOrAfter";
import "dayjs/plugin/isSameOrBefore";
import "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export interface IData {
  bookingCode: string;
  ticketNumber: string;
  nameEvent: string;
  usageStatus: string;
  usedDate: any | null;
  releasedDate: any;
  gate: string | null;
}

const EventPackage = () => {
  const dispatch = useAppDispatch();
  const { error, eventTickets } = useSelector(
    (state: RootState) => state.ticketManagement
  );

  const [form] = Form.useForm();
  const [valueSearch, setValueSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [selectAll, setSelectAll] = React.useState(false);
  const [dataSource, setDataSource] = React.useState<IData[]>([]);
  const [filteredDataSource, setFilteredDataSource] = React.useState<IData[]>(
    []
  );
  const [radioValue, setRadioValue] = React.useState<number>(1);
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(null);
  const [selectedGates, setSelectedGates] = React.useState<string[]>([]);

  const tableDataSource = filteredDataSource ? filteredDataSource : dataSource;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChangeDateFrom: DatePickerProps["onChange"] = (date, dateString) => {
    const dateFrom = dayjs(date);
    setDateFrom(dateFrom);
  };

  const onChangeDateTo: DatePickerProps["onChange"] = (date, dateString) => {
    const dateTo = dayjs(date);
    setDateTo(dateTo);
  };

  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    setSelectAll(e.target.checked);
  };

  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    const selectedGateStrings = checkedValues.map(String);
    setSelectedGates(selectedGateStrings);
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const onchangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(value);
  };

  React.useEffect(() => {
    try {
      dispatch(fetchEventTickets());
    } catch (err) {
      message.error(error);
    }
  }, [dispatch, error]);

  const handleSearching = React.useCallback(() => {
    const filteredData = dataSource.filter((data) => {
      return data.ticketNumber
        .toLowerCase()
        .includes(valueSearch.toLowerCase());
    });
    setFilteredDataSource(filteredData);
  }, [dataSource, valueSearch]);

  const debouncedHandleSearching = React.useMemo(
    () => _debounce(handleSearching, 800),
    [handleSearching]
  );

  React.useEffect(() => {
    debouncedHandleSearching();
    return debouncedHandleSearching.cancel;
  }, [debouncedHandleSearching]);

  React.useEffect(() => {
    let count = 1;
    if (eventTickets && !(valueSearch.length > 0)) {
      const newData: IData[] = eventTickets.map((data) => ({
        key: count++,
        bookingCode: data.bookingCode,
        ticketNumber: data.ticketNumber,
        nameEvent: data.nameEvent,
        usageStatus: data.usageStatus,
        usedDate: data.usedDate,
        releasedDate: data.releasedDate,
        gate: data.gate,
      }));
      setDataSource(newData);
    }
  }, [eventTickets, valueSearch.length]);

  const handleExportCSV = () => {
    let dataToExport =
      filteredDataSource.length > 0 ? filteredDataSource : dataSource;

    const csvData = dataToExport.map((data) => [
      data.bookingCode,
      data.ticketNumber,
      data.nameEvent,
      data.usageStatus,
      data.usedDate,
      data.releasedDate,
      data.gate,
    ]);

    if (csvData.length > 0) {
      const csvHeaders = [
        { key: "bookingCode", label: "Booking Code" },
        { key: "ticketNumber", label: "Số vé" },
        { key: "nameEvent", label: "Tên sự kiện" },
        { key: "usageStatus", label: "Trạng thái sử dụng" },
        { key: "usedDate", label: "Ngày sử dụng" },
        { key: "releasedDate", label: "Ngày xuất vé" },
        { key: "gate", label: "Cổng check - in" },
      ];
      const csvFileName = "data_event_package.csv";
      const csvOptions = {
        headers: csvHeaders,
        filename: csvFileName,
      };

      return (
        <CSVLink data={csvData} {...csvOptions}>
          <ButtonComponent
            text="Xuất file (.csv)"
            className="button-no-background bold-18 text-normal yellow-1"
          />
        </CSVLink>
      );
    } else {
      return null;
    }
  };

  const handleFormFinish = () => {
    let data: IData[] = dataSource;
    switch (radioValue) {
      case 2:
        data = data.filter((d) => d.usageStatus === "finished");
        break;
      case 3:
        data = data.filter((d) => d.usageStatus === "unused");
        break;
      case 4:
        data = data.filter((d) => d.usageStatus === "expired");
        break;
      default:
        data = dataSource;
        break;
    }

    if (dateFrom && dateTo) {
      const filterFunc = (d: IData) =>
        dayjs(d.usedDate).isSameOrAfter(dateFrom) &&
        dayjs(d.usedDate).isSameOrBefore(dateTo);
      data = data.filter(filterFunc);
    }

    if (selectAll || selectedGates.length === 0) {
      setFilteredDataSource(data);
    } else {
      const filterGateFunc = (d: IData) =>
        d.gate && selectedGates.includes(d.gate);
      const filteredData = data.filter(filterGateFunc);
      setFilteredDataSource(filteredData);
    }
    setVisible(false);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={31}>
      <div className="flex-between">
        <SearchComponent
          classNames="search-ticket text-italic italic-16 gray-brown"
          value={valueSearch}
          name="search"
          placeholder="Tìm bằng số vé"
          onChange={onchangeSearch}
          iconSuffix={<SearchOutlined className="i-search" />}
          clear
        />
        <Space>
          <ButtonComponent
            text="Lọc vé"
            icon={<FilterOutlined className="i-filter" />}
            className="button-no-background bold-18 text-normal yellow-1"
            onClick={showModal}
          />
          {handleExportCSV()}
        </Space>
      </div>
      <TableComponent
        columns={columns}
        dataSource={tableDataSource}
        pageSize={8}
      />

      <ModalComponent
        open={visible}
        onCancel={handleCancel}
        closable={false}
        footer={false}
        className="modal-ticket modal-filter"
        title={
          <Typography.Text className="gray-brown bold-24 text-normal">
            Lọc vé
          </Typography.Text>
        }
      >
        <Form
          form={form}
          onFinish={handleFormFinish}
          className="modal-container-filter"
        >
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
                  <Radio.Group
                    name="radiogroup"
                    defaultValue={1}
                    onChange={handleRadioChange}
                  >
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
                  <Checkbox.Group
                    name="checkboxGroup"
                    onChange={handleCheckboxChange}
                  >
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
                        <Checkbox value="Cổng 1" disabled={selectAll}>
                          <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                            Cổng 1
                          </Typography.Text>
                        </Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Cổng 2" disabled={selectAll}>
                          <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                            Cổng 2
                          </Typography.Text>
                        </Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Cổng 3" disabled={selectAll}>
                          <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                            Cổng 3
                          </Typography.Text>
                        </Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Cổng 4" disabled={selectAll}>
                          <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                            Cổng 4
                          </Typography.Text>
                        </Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="Cổng 5" disabled={selectAll}>
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
              htmlType="submit"
              style={{ width: 160 }}
            />
          </Space>
        </Form>
      </ModalComponent>
    </Space>
  );
};

export default EventPackage;
