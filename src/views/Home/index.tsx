import { useState } from "react";
import LargeBox from "../../shared/components/BoxComponents/LargeBox";
import { DatePickerProps, Space, Typography } from "antd";
import "../styles/Home.css";
import DatePickerComponent from "../../shared/components/DatePicker";
import PieComponent from "../../shared/components/ChartComponents/PieComponent";
import {
  dataEvent,
  dataFamily,
} from "../../shared/components/ChartComponents/PieComponent/data";
import AreaComponent from "../../shared/components/ChartComponents/AreaComponent";
import {
  dataDays,
  dataWeeks,
} from "../../shared/components/ChartComponents/AreaComponent/Data";

const Home = () => {
  const [chartAreaData, setChartAreaData] = useState(dataDays);

  const onChangeChartArea: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    if (dateString) {
      if (dateString.includes("-")) {
        setChartAreaData(dataWeeks);
      } else {
        setChartAreaData(dataDays);
      }
    }
  };

  const onChangeChart: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <LargeBox title="Thống kê">
      <div className="flex-between">
        <Typography.Text className="text-normal semibold-18 gray-brown">
          Doanh thu
        </Typography.Text>
        <DatePickerComponent onchange={onChangeChartArea} />
      </div>
      <AreaComponent
        data={chartAreaData}
        style={{ height: 260, marginTop: 27 }}
      />
      <Typography.Paragraph
        style={{ margin: "40px 0 0 0" }}
        className="text-normal gray-brown medium-14 opacity-5"
      >
        Tổng doanh thu theo tuần
      </Typography.Paragraph>
      <Typography.Text className="text-normal gray-brown bold-24">
        {Number(525145000).toLocaleString()}
      </Typography.Text>
      <Typography.Text className="text-normal gray-brown medium-14">
        {" "}
        đồng
      </Typography.Text>
      <br />
      <Space style={{ marginTop: 83 }} size={145} align="start">
        <DatePickerComponent onchange={onChangeChart} />
        <Space direction="vertical" align="center">
          <Typography.Text className="text-normal gray-brown semibold-18">
            Gói gia đình
          </Typography.Text>
          <PieComponent style={{ height: 272, width: 460 }} data={dataFamily} />
        </Space>
        <Space direction="vertical" align="center">
          <Typography.Text className="text-normal gray-brown semibold-18">
            Gói sự kiện
          </Typography.Text>
          <PieComponent style={{ height: 272, width: 460 }} data={dataEvent} />
        </Space>
      </Space>
    </LargeBox>
  );
};

export default Home;
