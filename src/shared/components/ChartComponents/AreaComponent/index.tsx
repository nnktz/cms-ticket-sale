import Area from "@ant-design/plots/es/components/area";
import configArea from "./configArea";
import IDataChart from "../interface";

interface IArea {
  data: IDataChart[];
  style: React.CSSProperties;
}

const AreaComponent: React.FC<IArea> = ({ data, style }) => {
  const updatedConfig = { ...configArea, data };

  return <Area {...updatedConfig} style={style} />;
};

export default AreaComponent;
