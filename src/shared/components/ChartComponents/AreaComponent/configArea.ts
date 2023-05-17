import { AreaConfig } from "@ant-design/plots/es/components/area";

const configArea: AreaConfig = {
  data: [],
  xField: "type",
  yField: "value",
  label: {
    fields: ["value"],
    formatter: () => "",
    style: {
      fill: "#000",
      opacity: 0.6,
    },
  },
  color: "#ff993c",
  areaStyle: {
    fill: "rgba(255, 153, 60, 0.6)",
  },
  tooltip: {
    showCrosshairs: false,
    showMarkers: false,
  },
  point: {
    size: 0,
    shape: "circle",
  },
  xAxis: {
    range: [0.015, 0.985],
    label: {
      offset: 20,
    },
  },
  smooth: true,
};

export default configArea;
