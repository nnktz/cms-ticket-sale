import { ColumnsType } from "antd/es/table";
import { IData } from ".";
import { Typography } from "antd";
import dayjs from "dayjs";

const columns: ColumnsType<IData> = [
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        STT
      </Typography.Text>
    ),
    dataIndex: "key",
    key: "key",
    render: (key: number) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {key}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Số vé
      </Typography.Text>
    ),
    dataIndex: "ticketNumber",
    key: "ticketNumber",
    render: (ticketNumber: string) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {ticketNumber}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Tên sự kiện
      </Typography.Text>
    ),
    dataIndex: "eventName",
    key: "eventName",
    render: (eventName: string) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {eventName}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Ngày sử dụng
      </Typography.Text>
    ),
    dataIndex: "usedDate",
    key: "usedDate",
    render: (usedDate: any) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {dayjs(usedDate).format("DD/MM/YYYY")}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Loại vé
      </Typography.Text>
    ),
    dataIndex: "ticketCategoryName",
    key: "ticketCategoryName",
    render: (ticketCategoryName: string) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {ticketCategoryName}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Cổng check - in
      </Typography.Text>
    ),
    dataIndex: "gate",
    key: "gate",
    render: (gate: string) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {gate}
      </Typography.Text>
    ),
  },
  {
    title: " ",
    dataIndex: "checked",
    key: "checked",
    render: (checked: boolean) => (
      <Typography.Text
        className={`text-italic italic-medium-14 ${checked ? "end" : "grey-4"}`}
      >
        {checked ? "Đã đối soát" : "Chưa đối soát"}
      </Typography.Text>
    ),
  },
];

export default columns;
