import { PieConfig } from "@ant-design/plots/es/components/interface";

const configPie: PieConfig = {
  appendPadding: 10,
  data: [],
  angleField: "value",
  colorField: "type",
  radius: 1,
  innerRadius: 0.5,
  label: {
    type: "outer",
    offset: "0%",
    content: "{value}",
    style: {
      textAlign: "center",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "22px",
      fill: "#1E0D03",
    },
    background: {
      style: {
        fill: "#ffffff",
        stroke: "#ffffff",
        height: 20,
        filter: "drop-shadow(0px 4px 4px rgba(50, 50, 71, 0.25))",
      },
      padding: 4,
    },
  },
  color: ["#4F75FF", "#FF8A48"],
  interactions: [
    {
      type: "element-selected",
    },
    {
      type: "element-active",
    },
  ],
  legend: {
    marker: {
      symbol: "square",
    },
  },
  statistic: {
    title: false,
    content: {
      style: {
        whiteSpace: "pre-wrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      content: "",
    },
  },
};

export default configPie;
