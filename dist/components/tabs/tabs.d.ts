import React from "react";
export interface TabsProps {
    defaultIndex?: string;
    onSelect?: (index: string) => void;
    children?: React.ReactNode;
}
interface TabContextProps {
    activeIndex: string;
    handleSelect?: (index: string, disable: boolean) => void;
}
export declare const TabContext: React.Context<TabContextProps>;
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
