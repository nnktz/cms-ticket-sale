import React from "react";
import { DatePickerProps, Form, Radio, Space, Typography } from "antd";
import _debounce from "lodash/debounce";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";
import ButtonComponent from "../../../shared/components/ButtonComponent";
import HalfBox from "../../../shared/components/BoxComponents/HalfBox";
import SearchComponent from "../../../shared/components/SearchComponent";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import TableComponent from "../../../shared/components/TableComponent";
import DatePickerCustom from "../../../shared/components/DatePicker/DatePickerCustom";
import { dataEventPackage } from "../Data";
import columns from "./ColumsData";
import SelectComponent from "../../../shared/components/SelectComponent";

export interface IData {
  ticketNumber: string;
  eventName: string;
  usedDate: any;
  ticketCategoryName: string;
  gate: string;
  checked: boolean;
}

const EventPackageChecking = () => {
  const [form] = Form.useForm();
  const [checking, setChecking] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState("");
  const [dataSource, setDataSource] = React.useState<IData[]>([]);
  const [filteredDataSource, setFilteredDataSource] = React.useState<IData[]>(
    []
  );

  const tableDataSource = valueSearch ? filteredDataSource : dataSource;

  const onchangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(value);
  };

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChangeDateTo: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeDateFrom: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const checkingHandler = () => {
    setChecking(true);
  };

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
    if (dataEventPackage && !(valueSearch.length > 0)) {
      const newData: IData[] = dataEventPackage.map((data) => ({
        key: count++,
        ticketNumber: data.ticketNumber,
        eventName: data.eventName,
        usedDate: data.usedDate,
        ticketCategoryName: data.ticketCategoryName,
        gate: data.gate,
        checked: data.checked,
      }));
      setDataSource(newData);
    }
  }, [valueSearch.length]);

  const handleExportCSV = () => {
    let dataToExport =
      filteredDataSource.length > 0 ? filteredDataSource : dataSource;

    const csvData = dataToExport.map((data) => [
      data.ticketNumber,
      data.eventName,
      data.usedDate,
      data.ticketCategoryName,
      data.gate,
      data.checked,
    ]);

    if (csvData.length > 0) {
      const csvHeaders = [
        { key: "ticketNumber", label: "Số vé" },
        { key: "eventName", label: "Tên sự kiện" },
        { key: "usedDate", label: "Ngày sử dụng" },
        { key: "ticketCategoryName", label: "Loại vé" },
        { key: "gate", label: "Cổng check - in" },
        { key: "check", label: "" },
      ];
      const csvFileName = "data_event_package_checking.csv";
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

  return (
    <HalfBox mainTitle="Đối soát vé" subTitle="Lọc vé">
      <Space style={{ width: "100%" }} direction="vertical" size={24}>
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
          {checking ? (
            handleExportCSV()
          ) : (
            <ButtonComponent
              text="Chốt đối soát"
              className="bold-18 text-normal white bg-yellow-1"
              onClick={checkingHandler}
            />
          )}
        </div>
        <TableComponent
          columns={columns}
          dataSource={tableDataSource}
          pageSize={8}
        />
      </Space>
      <Form form={form} onFinish={() => {}}>
        <Form.Item label="" name="name">
          <SelectComponent
            clear
            placeholder="Chọn tên sự kiện"
            options={[
              {
                value: "hoicho2021",
                label: "Hội chợ triển lãm tiêu dùng 2021",
              },
            ]}
            onchange={handleChangeSelect}
          />
        </Form.Item>
        <Form.Item label="" name="status">
          <Space align="start" size={26}>
            <Typography.Text className="semibold-16 text-normal gray-brown opacity-8">
              Tình trạng đối soát
            </Typography.Text>
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Space size={16} direction="vertical">
                <Radio value={1} className="radio">
                  <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                    Tất cả
                  </Typography.Text>
                </Radio>
                <Radio value={2} className="radio">
                  <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                    Đã đối soát
                  </Typography.Text>
                </Radio>
                <Radio value={3} className="radio">
                  <Typography.Text className="gray-brown medium-16 text-normal opacity-7">
                    Chưa đối soát
                  </Typography.Text>
                </Radio>
              </Space>
            </Radio.Group>
          </Space>
        </Form.Item>
        <Form.Item label="" name="category">
          <Space size={109}>
            <Typography.Text className="semibold-16 text-normal gray-brown opacity-8">
              Loại vé
            </Typography.Text>
            <Typography.Text className="medium-16 text-normal gray-brown opacity-7">
              Vé cổng
            </Typography.Text>
          </Space>
        </Form.Item>
        <Form.Item label="" name="dateFrom">
          <Space size={104}>
            <Typography.Text className="semibold-16 text-normal gray-brown opacity-8">
              Từ ngày
            </Typography.Text>
            <DatePickerCustom
              disabled
              defaultValue={dayjs()}
              onchange={onChangeDateFrom}
            />
          </Space>
        </Form.Item>
        <Form.Item label="" name="dateTo">
          <Space size={98}>
            <Typography.Text className="semibold-16 text-normal gray-brown opacity-8">
              Đến ngày
            </Typography.Text>
            <DatePickerCustom onchange={onChangeDateTo} />
          </Space>
        </Form.Item>
        <div className="flex-center">
          <ButtonComponent
            className="button-no-background bold-18 text-normal yellow-1"
            text="Lọc"
            type="submit"
            style={{ width: 160 }}
          />
        </div>
      </Form>
    </HalfBox>
  );
};

export default EventPackageChecking;
