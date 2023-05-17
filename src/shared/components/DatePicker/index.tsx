import DatePicker, { DatePickerProps } from "antd/es/date-picker";
import "./styles.css";
import { useState } from "react";
import Radio from "antd/es/radio";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import Typography from "antd/es/typography";

dayjs.locale("vi");

interface IDatePicker {
  onchange: DatePickerProps["onChange"];
}

const dateFormat = "MMMM, YYYY";
const weekFormat = "DD/MM";

const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} - ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;

const DatePickerComponent: React.FC<IDatePicker> = ({ onchange }) => {
  const [mode, setMode] = useState<"date" | "week">("date");

  const handleModeChange = (e: any) => {
    setMode(e.target.value);
  };

  const renderExtraFooter = () => {
    return (
      <Radio.Group value={mode} onChange={handleModeChange}>
        <Radio value="date">
          <Typography.Text className="text-normal gray-brown medium-14">
            Theo ngày
          </Typography.Text>
        </Radio>
        <Radio value="week">
          <Typography.Text className="text-normal gray-brown medium-14">
            Theo tuần
          </Typography.Text>
        </Radio>
      </Radio.Group>
    );
  };

  return (
    <DatePicker
      defaultValue={dayjs()}
      onChange={onchange}
      showToday={false}
      clearIcon={false}
      className="date-picker"
      picker={mode}
      format={mode === "date" ? dateFormat : customWeekStartEndFormat}
      renderExtraFooter={renderExtraFooter}
      locale={{
        lang: {
          locale: "vi",
          placeholder: "Chọn ngày",
          rangePlaceholder: ["Ngày bắt đầu", "Ngày kết thúc"],
          today: "Hôm nay",
          now: "Hiện tại",
          backToToday: "Về ngày hôm nay",
          ok: "OK",
          clear: "Xóa",
          month: "Tháng",
          year: "Năm",
          timeSelect: "Chọn thời gian",
          dateSelect: "Chọn ngày",
          monthSelect: "Chọn tháng",
          yearSelect: "Chọn năm",
          decadeSelect: "Chọn thập kỷ",
          yearFormat: "YYYY",
          dateFormat: "DD/MM/YYYY",
          dayFormat: "DD",
          dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
          monthBeforeYear: true,
          previousMonth: "Tháng trước (PageUp)",
          nextMonth: "Tháng sau (PageDown)",
          previousYear: "Năm trước (Control + left)",
          nextYear: "Năm sau (Control + right)",
          previousDecade: "Thập kỷ trước",
          nextDecade: "Thập kỷ sau",
          previousCentury: "Thế kỷ trước",
          nextCentury: "Thế kỷ sau",
        },
        timePickerLocale: {
          placeholder: "Chọn giờ",
        },
      }}
    />
  );
};

export default DatePickerComponent;
