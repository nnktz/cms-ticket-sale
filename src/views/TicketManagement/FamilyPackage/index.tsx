import React from "react";
import "../../styles/TicketManagement.css";
import SearchComponent from "../../../shared/components/SearchComponent";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import { Space } from "antd";
import ButtonComponent from "../../../shared/components/ButtonComponent";
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";
import TableComponent from "../../../shared/components/TableComponent";
import columns from "./ColumsData";
import { dataFamilyPackage } from "../Data";
import _debounce from "lodash/debounce";
import ModalFilter from "../ModalFilter";
import { CSVLink } from "react-csv";

export interface IData {
  bookingCode: string;
  ticketNumber: string;
  usageStatus: string;
  usedDate: any;
  releasedDate: any;
  gate: string | null;
}

const FamilyPackage = () => {
  const [valueSearch, setValueSearch] = React.useState("");
  const [dataSource, setDataSource] = React.useState<IData[]>([]);
  const [filteredDataSource, setFilteredDataSource] = React.useState<IData[]>(
    []
  );
  const tableDataSource = valueSearch ? filteredDataSource : dataSource;
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onchangeSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(value);
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
    if (dataFamilyPackage && !(valueSearch.length > 0)) {
      const newData: IData[] = dataFamilyPackage.map((data) => ({
        key: count++,
        bookingCode: data.bookingCode,
        ticketNumber: data.ticketNumber,
        usageStatus: data.usageStatus,
        usedDate: data.usedDate,
        releasedDate: data.releasedDate,
        gate: data.gate,
      }));
      setDataSource(newData);
    }
  }, [valueSearch.length]);

  const handleExportCSV = () => {
    let dataToExport =
      filteredDataSource.length > 0 ? filteredDataSource : dataSource;

    const csvData = dataToExport.map((data) => [
      data.bookingCode,
      data.ticketNumber,
      data.usageStatus,
      data.usedDate,
      data.releasedDate,
      data.gate,
    ]);

    if (csvData.length > 0) {
      const csvHeaders = [
        { key: "bookingCode", label: "Booking Code" },
        { key: "ticketNumber", label: "Số vé" },
        { key: "usageStatus", label: "Trạng thái sử dụng" },
        { key: "usedDate", label: "Ngày sử dụng" },
        { key: "releasedDate", label: "Ngày xuất vé" },
        { key: "gate", label: "Cổng check - in" },
      ];
      const csvFileName = "data_family_package.csv";
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
      <ModalFilter
        open={visible}
        onSave={handleCancel}
        onCancel={handleCancel}
      />
    </Space>
  );
};

export default FamilyPackage;
