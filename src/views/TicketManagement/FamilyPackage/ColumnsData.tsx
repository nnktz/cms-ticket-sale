import { ColumnsType } from "antd/es/table";
import { IData } from ".";
import { Typography } from "antd";
import TagComponent from "../../../shared/components/TagComponent";
import Badge from "../../../shared/components/Badge";
import dayjs from "dayjs";
import "../../styles/TicketManagement.css";
import ActionFilter from "./ActionFilter";

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
        Booking Code
      </Typography.Text>
    ),
    dataIndex: "bookingCode",
    key: "bookingCode",
    render: (bookingCode: string) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {bookingCode}
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
        Tình trạng sử dụng
      </Typography.Text>
    ),
    dataIndex: "usageStatus",
    key: "usageStatus",
    render: (usageStatus: string) => (
      <>
        {usageStatus === "finished" ? (
          <TagComponent
            color="#EAF1F8"
            style={{ padding: "4px 12px", borderColor: "#919DBA" }}
          >
            <Badge
              status={3}
              text={
                <Typography.Text className="medium-12 text-normal grey-5">
                  Đã sử dụng
                </Typography.Text>
              }
            />
          </TagComponent>
        ) : usageStatus === "unused" ? (
          <TagComponent
            color="#DEF7E0"
            style={{ padding: "4px 12px", borderColor: "#03AC00" }}
          >
            <Badge
              status={1}
              text={
                <Typography.Text className="medium-12 text-normal promomote">
                  Chưa sử dụng
                </Typography.Text>
              }
            />
          </TagComponent>
        ) : usageStatus === "expired" ? (
          <TagComponent
            color="#F8EBE8"
            style={{ padding: "4px 12px", borderColor: "#FD5959" }}
          >
            <Badge
              status={0}
              text={
                <Typography.Text className="medium-12 text-normal end">
                  Hết hạn
                </Typography.Text>
              }
            />
          </TagComponent>
        ) : null}
      </>
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
        Ngày xuất vé
      </Typography.Text>
    ),
    dataIndex: "releasedDate",
    key: "releasedDate",
    render: (releasedDate: any) => (
      <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
        {dayjs(releasedDate).format("DD/MM/YYYY")}
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
      <>
        {gate ? (
          <Typography.Text className="medium-14 text-normal gray-brown opacity-7">
            {gate}
          </Typography.Text>
        ) : (
          <Typography.Text
            style={{ padding: "0 16px" }}
            className="medium-14 text-normal gray-brown opacity-7"
          >
            _
          </Typography.Text>
        )}
      </>
    ),
  },
  {
    title: " ",
    key: "action",
    render: (_, record) => {
      if (record.usageStatus === "unused") {
        return <ActionFilter record={record} />;
      }
      return null;
    },
  },
];

export default columns;
