import { TabsProps, Typography } from "antd";
import FamilyPackage from "../../../views/TicketManagement/FamilyPackage";
import EventPackage from "../../../views/TicketManagement/EventPackage";

export let defaultKey = "family-package";

const items: TabsProps["items"] = [
  {
    key: "family-package",
    label: (
      <Typography.Text className="semibold-18 text-normal gray-brown opacity-7">
        Gói gia đình
      </Typography.Text>
    ),
    children: <FamilyPackage />,
  },
  {
    key: "event-package",
    label: (
      <Typography.Text className="semibold-18 text-normal gray-brown opacity-7">
        Gói sự kiện
      </Typography.Text>
    ),
    children: <EventPackage />,
  },
];

export default items;
