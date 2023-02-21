import Tabs,{TabsProps} from "./tabs";
import TabItem,{TabItemProps} from "./tabItem";

export type TabsComponent = React.FC<TabsProps> & {
  TabItem: React.FC<TabItemProps>,
  
}

const tabsComponent = Tabs as TabsComponent
tabsComponent.TabItem= TabItem

export default tabsComponent