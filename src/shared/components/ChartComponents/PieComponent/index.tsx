import Pie from "@ant-design/plots/es/components/pie";
import configPie from "./configPie";
import IDataChart from "../interface";

interface IPie {
  style: React.CSSProperties;
  data: IDataChart[];
}

const PieComponent: React.FC<IPie> = ({ style, data }) => {
  const updatedConfig = { ...configPie, data };

  return <Pie {...updatedConfig} style={style} />;
};

export default PieComponent;
