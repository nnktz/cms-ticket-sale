import DatePicker from "antd/es/date-picker";
import "./styles.css";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import IDatePicker from "./interface";

dayjs.locale("vi");

const dateFormat = "DD/MM/YYYY";

const DatePickerCustom: React.FC<IDatePicker> = ({
  onchange,
  defaultValue,
}) => {
  return (
    <DatePicker
      defaultValue={defaultValue}
      onChange={onchange}
      showToday={false}
      clearIcon={false}
      className="date-picker"
      format={dateFormat}
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

export default DatePickerCustom;
