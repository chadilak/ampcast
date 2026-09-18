import React from 'react';
import {TabItem} from './TabList';

export interface TabPanelProps {
    id: string;
    item: TabItem;
    index: number;
    hidden: boolean;
}

export default function TabPanel({id, item, index, hidden}: TabPanelProps) {
    const className = item.suffix ? `tab-panel-${item.suffix}` : '';

    return (
        <div
            className={`tab-panel ${className}`}
            id={`${id}-panel-${index}`}
            hidden={hidden}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${index}`}
        >
            {item.panel}
        </div>
    );
}
