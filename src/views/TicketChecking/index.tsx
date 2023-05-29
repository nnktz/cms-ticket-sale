import React from "react";
import HalfBox from "../../shared/components/BoxComponents/HalfBox";
import {
  DatePickerProps,
  Form,
  Popconfirm,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
  message,
} from "antd";
import SearchComponent from "../../shared/components/SearchComponent";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import TableComponent from "../../shared/components/TableComponent";
import ButtonComponent from "../../shared/components/ButtonComponent";
import columns from "./ColumnsData";
import _debounce from "lodash/debounce";
import { CSVLink } from "react-csv";
import DatePickerCustom from "../../shared/components/DatePicker/DatePickerCustom";
import dayjs, { Dayjs } from "dayjs";
import { RootState, useAppDispatch } from "../../core/store/redux";
import { useSelector } from "react-redux";
import {
  fetchTickets,
  updateChecked,
} from "../../modules/ticketChecking/actions";
import isSameOrBefore from "dayjs/esm/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/esm/plugin/isSameOrAfter";
import "dayjs/plugin/isSameOrBefore";
import "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export interface IData {
  ticketNumber: string;
  usedDate: any;
  ticketCategoryName: string;
  gate: string;
  checked: boolean;
}

const TicketChecking: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, tickets } = useSelector(
    (state: RootState) => state.ticketChecking
  );

  const [form] = Form.useForm();
  const [checking, setChecking] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState("");
  const [dataSource, setDataSource] = React.useState<IData[]>([]);
  const [filteredDataSource, setFilteredDataSource] = React.useState<IData[]>(
    []
  );
  const [radioValue, setRadioValue] = React.useState<number>(1);
  const [dateFrom, setDateFrom] = React.useState<Dayjs>(dayjs());
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(null);

  const tableDataSource = filteredDataSource ? filteredDataSource : dataSource;

  const onchangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(value);
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const onChangeDateFrom: DatePickerProps["onChange"] = (date, dateString) => {
    const dateFrom = dayjs(date);
    setDateFrom(dateFrom);
  };

  const onChangeDateTo: DatePickerProps["onChange"] = (date, dateString) => {
    const dateTo = dayjs(date);
    setDateTo(dateTo);
  };

  const checkingHandler = () => {
    dispatch(updateChecked());
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 2000);
    });
  };

  const confirm = async (): Promise<void> => {
    await checkingHandler();
    setChecking(true);
  };

  React.useEffect(() => {
    try {
      dispatch(fetchTickets());
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
    if (tickets && !(valueSearch.length > 0)) {
      const newData: IData[] = tickets.map((data) => ({
        key: count++,
        ticketNumber: data.ticketNumber,
        usedDate: data.usedDate,
        ticketCategoryName: data.ticketCategoryName,
        gate: data.gate,
        checked: data.checked,
      }));
      setDataSource(newData);
    }
  }, [tickets, valueSearch.length]);

  const handleExportCSV = () => {
    let dataToExport =
      filteredDataSource.length > 0 ? filteredDataSource : dataSource;

    const csvData = dataToExport.map((data) => [
      data.ticketNumber,
      data.usedDate,
      data.ticketCategoryName,
      data.gate,
      data.checked,
    ]);

    if (csvData.length > 0) {
      const csvHeaders = [
        { key: "ticketNumber", label: "Số vé" },
        { key: "usedDate", label: "Ngày sử dụng" },
        { key: "ticketCategoryName", label: "Tên loại vé" },
        { key: "gate", label: "Cổng check - in" },
        { key: "check", label: "" },
      ];
      const csvFileName = "data_ticket_checking.csv";
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
    let filteredData: IData[] = [];
    switch (radioValue) {
      case 2:
        filteredData = dataSource.filter((d) => d.checked);
        break;
      case 3:
        filteredData = dataSource.filter((d) => !d.checked);
        break;
      default:
        filteredData = dataSource;
        break;
    }

    if (dateTo) {
      filteredData = filteredData.filter(
        (data) =>
          dayjs(data.usedDate).isSameOrAfter(dateFrom) &&
          dayjs(data.usedDate).isSameOrBefore(dateTo)
      );
    }
    setFilteredDataSource(filteredData);
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
            <Popconfirm
              title="Đối soát vé"
              description="Có muốn chốt đối soát dữ liệu hiện tại?"
              onConfirm={confirm}
              okText={
                <Typography.Text className="text-normal white medium-14">
                  Xác nhận
                </Typography.Text>
              }
              cancelText={
                <Typography.Text className="text-normal gray-brown opacity-8 medium-14">
                  Huỷ
                </Typography.Text>
              }
            >
              <ButtonComponent
                text="Chốt đối soát"
                className="bold-18 text-normal white bg-yellow-1"
              />
            </Popconfirm>
          )}
        </div>
        <TableComponent
          columns={columns}
          dataSource={tableDataSource}
          pageSize={8}
        />
      </Space>
      <Form form={form} onFinish={handleFormFinish}>
        <Form.Item label="" name="status">
          <Space align="start" size={26}>
            <Typography.Text className="semibold-16 text-normal gray-brown opacity-8">
              Tình trạng đối soát
            </Typography.Text>
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              onChange={handleRadioChange}
            >
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
              defaultValue={dateFrom}
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
            htmlType="submit"
            style={{ width: 160 }}
          />
        </div>
      </Form>
    </HalfBox>
  );
};

export default TicketChecking;
