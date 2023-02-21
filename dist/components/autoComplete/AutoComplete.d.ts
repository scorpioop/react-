import React, { FC } from 'react';
import { Inputprops } from '../input/input';
type oneValueData = {
    value: string;
};
export type ItemData<T = {}> = T & oneValueData;
export interface AutoCompleteProps extends Omit<Inputprops, 'onSelect'> {
    fetchSuggestions: (str: string) => ItemData[] | Promise<ItemData[]>;
    onSelect?: (item: string) => void;
    renderPerform?: (item: ItemData) => React.ReactNode;
    primaryKey?: string;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export {};
