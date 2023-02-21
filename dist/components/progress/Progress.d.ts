import React from "react";
import { ThemeProps } from "../icon/Icon";
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
