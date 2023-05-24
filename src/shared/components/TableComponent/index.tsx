import { Table, TablePaginationConfig } from "antd";
import ITable from "./interface";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

const TableComponent = (props: ITable) => {
  const navigate = useNavigate();

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ) => {
    navigate(`?page=${pagination.current}`);
  };

  return (
    <Table
      className={props.className}
      columns={props.columns}
      dataSource={props.dataSource}
      pagination={{
        pageSize: props.pageSize,
        position: ["bottomCenter"],
      }}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "bg-white" : "bg-grey-4"
      }
      onChange={handleTableChange}
    />
  );
};

export default TableComponent;
