import { useNavigate } from "react-router-dom";
import LargeBox from "../../shared/components/BoxComponents/LargeBox";
import TabsComponent from "../../shared/components/TabsComponent";
import items, {
  defaultKey,
} from "../../shared/components/TabsComponent/itemsTicketManagement";

const TicketManagement = () => {
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    navigate(`${key}`);
  };

  return (
    <LargeBox title="Danh sách vé">
      <TabsComponent
        defaultKey={defaultKey}
        items={items}
        onChange={handleTabChange}
      />
    </LargeBox>
  );
};

export default TicketManagement;
