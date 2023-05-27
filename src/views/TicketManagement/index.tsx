import LargeBox from "../../shared/components/BoxComponents/LargeBox";
import TabsComponent from "../../shared/components/TabsComponent";
import items, {
  defaultKey,
} from "../../shared/components/TabsComponent/itemsTicketManagement";

const TicketManagement = () => {
  return (
    <LargeBox title="Danh sách vé">
      <TabsComponent defaultKey={defaultKey} items={items} />
    </LargeBox>
  );
};

export default TicketManagement;
