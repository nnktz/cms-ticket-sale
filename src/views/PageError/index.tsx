import { Result, Typography } from "antd";
import { Link } from "react-router-dom";
import ButtonComponent from "../../shared/components/ButtonComponent";

const PageError = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <Typography.Text className="text-normal gray-brown">
          Xin lỗi, trang bạn truy cập không tồn tại hoặc đã được dời đi.
        </Typography.Text>
      }
      extra={
        <Link to="/home">
          <ButtonComponent text="Quay về trang chủ" />
        </Link>
      }
    />
  );
};

export default PageError;
