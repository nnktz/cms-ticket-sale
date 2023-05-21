import { ColumnsType } from "antd/es/table";

export default interface ITable {
  className?: string;
  columns: ColumnsType<any>;
  dataSource: any[];
  pageSize: number;
}
