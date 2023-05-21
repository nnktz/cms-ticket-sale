import { PresetStatusColorType } from "antd/es/_util/colors";
import Badge from "antd/es/badge";
import React from "react";

interface IBadge {
  status?: number;
  id?: string;
  listState?: PresetStatusColorType[];
  text?: string | React.ReactNode;
}

const UIBadge: React.FC<IBadge> = (props) => {
  const status = React.useMemo<PresetStatusColorType>(() => {
    if (props.listState) {
      return props.listState[props.status || 0] || "default";
    }
    if (props.status === 0) {
      return "error";
    }
    if (props.status === 1) {
      return "success";
    }
    if (props.status === 2) {
      return "processing";
    }
    if (props.status === 3) {
      return "default";
    }
    return "warning";
  }, [props.listState, props.status]);

  if (props.status == null) {
    return <span>--</span>;
  }

  return <Badge status={status} text={props.text} />;
};

export default React.memo(UIBadge);
