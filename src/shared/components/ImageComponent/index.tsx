import { Image } from "antd";
import { IImage } from "./interface";

const ImageComponent: React.FC<IImage> = ({
  className,
  height,
  src,
  width,
}) => {
  return (
    <Image
      className={className}
      width={width}
      height={height}
      src={src}
      preview={false}
    />
  );
};

export default ImageComponent;
