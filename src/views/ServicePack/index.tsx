import React from "react";
import LargeBox from "../../shared/components/BoxComponents/LargeBox";
import { Space } from "antd";
import SearchComponent from "../../shared/components/SearchComponent";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import ButtonComponent from "../../shared/components/ButtonComponent";
import { CSVLink } from "react-csv";
import dataPackage from "./Data";
import TableComponent from "../../shared/components/TableComponent";
import columns from "./ColumnsData";
import ModalAdd from "./ModalAdd";
import _debounce from "lodash/debounce";

export interface IData {
  packageCode: string;
  packageName: string;
  applicableDate: any;
  expiredDate: any;
  price: string;
  comboPrice: string | null;
  comboTicketNumber: number | null;
  status: string;
}

const ServicePack = () => {
  const [valueSearch, setValueSearch] = React.useState("");
  const [dataSource, setDataSource] = React.useState<IData[]>([]);
  const [filteredDataSource, setFilteredDataSource] = React.useState<IData[]>(
    []
  );
  const [visible, setVisible] = React.useState(false);

  const tableDataSource = valueSearch ? filteredDataSource : dataSource;

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
      return data.packageCode.toLowerCase().includes(valueSearch.toLowerCase());
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
    if (dataPackage && !(valueSearch.length > 0)) {
      const newData: IData[] = dataPackage.map((data) => ({
        key: count++,
        packageCode: data.packageCode,
        packageName: data.packageName,
        applicableDate: data.applicableDate,
        expiredDate: data.expiredDate,
        price: data.price,
        comboPrice: data.comboPrice,
        comboTicketNumber: data.comboTicketNumber,
        status: data.status,
      }));
      setDataSource(newData);
    }
  }, [valueSearch.length]);

  const handleExportCSV = () => {
    let dataToExport =
      filteredDataSource.length > 0 ? filteredDataSource : dataSource;

    const csvData = dataToExport.map((data) => [
      data.packageCode,
      data.packageName,
      data.applicableDate,
      data.expiredDate,
      data.price,
      data.comboPrice,
      data.comboTicketNumber,
      data.status,
    ]);

    if (csvData.length > 0) {
      const csvHeaders = [
        { key: "packageCode", label: "Mã gói" },
        { key: "packageName", label: "Tên gói vé" },
        { key: "applicableDate", label: "Ngày áp dụng" },
        { key: "expiredDate", label: "Ngày hết hạn" },
        { key: "price", label: "Giá vé (VNĐ/Vé)" },
        { key: "comboPrice", label: "Giá Combo (VNĐ/Combo)" },
        { key: "comboTicketNumber", label: "Số vé Combo (VNĐ/Combo)" },
        { key: "status", label: "Tình trạng" },
      ];
      const csvFileName = "data_package.csv";
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
    <LargeBox title="Danh sách gói vé">
      <Space direction="vertical" style={{ width: "100%" }}>
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
            {handleExportCSV()}
            <ButtonComponent
              text="Thêm gói vé"
              className="bold-18 text-normal white bg-yellow-1"
              style={{ height: 48 }}
              onClick={showModal}
            />
          </Space>
        </div>

        <TableComponent
          className="table-service"
          columns={columns}
          dataSource={tableDataSource}
          pageSize={8}
        />
        <ModalAdd open={visible} onCancel={handleCancel} onOK={handleCancel} />
      </Space>
    </LargeBox>
  );
};

export default ServicePack;
