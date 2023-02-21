/// <reference types="react" />
import { TabsProps } from "./tabs";
import { TabItemProps } from "./tabItem";
export type TabsComponent = React.FC<TabsProps> & {
    TabItem: React.FC<TabItemProps>;
};
declare const tabsComponent: TabsComponent;
export default tabsComponent;
