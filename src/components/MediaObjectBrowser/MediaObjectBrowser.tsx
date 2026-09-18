import React from 'react';
import MediaObject from 'types/MediaObject';
import MediaService from 'types/MediaService';
import MediaSource from 'types/MediaSource';
import useFirstValue from 'hooks/useFirstValue';
import MediaObjectHeader from './MediaObjectHeader';
import MediaObjectTabs from './MediaObjectTabs';
import './MediaObjectBrowser.scss';

export interface MediaObjectBrowserProps<T extends MediaObject> {
    service: MediaService;
    source: MediaSource<T>;
    item: T;
    itemList: React.ReactNode;
    children?: React.ReactNode;
    error?: unknown;
}

export default function MediaObjectBrowser<T extends MediaObject>({
    service,
    source,
    item,
    itemList,
    children,
    error,
}: MediaObjectBrowserProps<T>) {
    const originalItem = useFirstValue(item); // Prevent re-renders if the object is updated.

    return (
        <div className="panel media-object-browser">
            <div className="media-object-browser-content">
                <MediaObjectHeader>{itemList}</MediaObjectHeader>
                <MediaObjectTabs
                    service={service}
                    source={source}
                    item={originalItem}
                    error={error}
                >
                    {children}
                </MediaObjectTabs>
            </div>
        </div>
    );
}
