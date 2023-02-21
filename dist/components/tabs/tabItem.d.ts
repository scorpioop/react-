import React from "react";
export interface TabItemProps {
    index?: string;
    label: string | number;
    disable?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
