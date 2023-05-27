import { ColumnsType } from "antd/es/table";
import { IData } from ".";
import { Typography } from "antd";
import dayjs from "dayjs";
import TagComponent from "../../shared/components/TagComponent";
import Badge from "../../shared/components/Badge";
import ActionUpdate from "./ActionUpdate";
import "../styles/ServicePack.css";

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
        Mã gói
      </Typography.Text>
    ),
    dataIndex: "packageCode",
    key: "packageCode",
    render: (packageCode: string) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {packageCode}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Tên gói vé
      </Typography.Text>
    ),
    dataIndex: "packageName",
    key: "packageName",
    render: (packageName: string) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {packageName}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Ngày áp dụng
      </Typography.Text>
    ),
    dataIndex: "applicableDate",
    key: "applicableDate",
    render: (applicableDate: any) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {dayjs(applicableDate).format("DD/MM/YYYY")}
        <br />
        {dayjs(applicableDate).format("HH:mm:ss")}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Ngày hết hạn
      </Typography.Text>
    ),
    dataIndex: "expiredDate",
    key: "expiredDate",
    render: (expiredDate: any) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {dayjs(expiredDate).format("DD/MM/YYYY")}
        <br />
        {dayjs(expiredDate).format("HH:mm:ss")}
      </Typography.Text>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Giá vé (VNĐ/Vé)
      </Typography.Text>
    ),
    dataIndex: "price",
    key: "price",
    render: (price: string) => (
      <>
        {price && (
          <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
            {Number(price).toLocaleString("vi-VN")} VNĐ
          </Typography.Text>
        )}
      </>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Giá Combo (VNĐ/Combo)
      </Typography.Text>
    ),
    key: "combo",
    render: (_, { comboPrice, comboTicketNumber }) => (
      <>
        {comboPrice && comboTicketNumber && (
          <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
            {`${Number(comboPrice).toLocaleString(
              "vi-VN"
            )} VNĐ/${comboTicketNumber} Vé`}
          </Typography.Text>
        )}
      </>
    ),
  },
  {
    title: (
      <Typography.Text className="semibold-16 text-normal gray-brown">
        Tình trạng
      </Typography.Text>
    ),
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <>
        {status === "active" ? (
          <TagComponent
            color="#DEF7E0"
            style={{ padding: "4px 12px", borderColor: "#03AC00" }}
          >
            <Badge
              status={1}
              text={
                <Typography.Text className="medium-12 text-normal promomote">
                  Đang áp dụng
                </Typography.Text>
              }
            />
          </TagComponent>
        ) : status === "inactive" ? (
          <TagComponent
            color="#F8EBE8"
            style={{ padding: "4px 12px", borderColor: "#FD5959" }}
          >
            <Badge
              status={0}
              text={
                <Typography.Text className="medium-12 text-normal end">
                  Tắt
                </Typography.Text>
              }
            />
          </TagComponent>
        ) : null}
      </>
    ),
  },
  {
    title: " ",
    key: "action",
    render: (_, record) => {
      return <ActionUpdate record={record} />;
    },
  },
];

export default columns;
