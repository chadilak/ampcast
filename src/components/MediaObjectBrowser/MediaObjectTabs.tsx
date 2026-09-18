import React, {useMemo} from 'react';
import MediaObject from 'types/MediaObject';
import MediaService from 'types/MediaService';
import MediaSource from 'types/MediaSource';
import ErrorBox from 'components/Errors/ErrorBox';
import MediaDetails from 'components/MediaInfo/MediaDetails';
import MediaInfo from 'components/MediaInfo';
import Scrollable from 'components/Scrollable';
import TabList, {TabItem} from 'components/TabList';
import RelatedItems from './RelatedItems';
import RelatedPlaylists from './RelatedPlaylists';

export interface MediaObjectTabsProps<T extends MediaObject> {
    service: MediaService;
    source: MediaSource<T>;
    item: T | undefined;
    error?: unknown;
    children?: React.ReactNode;
}

export default function MediaObjectTabs<T extends MediaObject>({
    service,
    source,
    item,
    error,
    children,
}: MediaObjectTabsProps<T>) {
    const relatedItemsPager = useMemo(() => {
        return item ? service.createRelatedItemsPager?.(item) || null : null;
    }, [service, item]);

    const relatedPlaylists = useMemo(() => {
        return item ? service.createRelatedPlaylistsSource?.(item) || null : null;
    }, [service, item]);

    const tabs: TabItem[] = useMemo(() => {
        const tabs = [
            {
                tab: 'Media',
                panel: error ? (
                    <ErrorBox error={error} reportedBy="MediaObjectBrowser" />
                ) : (
                    children
                ),
                suffix: 'media',
            },
        ];
        if (item) {
            if (relatedPlaylists) {
                tabs.push({
                    tab: 'Playlists',
                    panel: <RelatedPlaylists service={service} source={relatedPlaylists} />,
                    suffix: 'playlists',
                });
            }
            if (relatedItemsPager) {
                tabs.push({
                    tab: 'Related',
                    panel: (
                        <RelatedItems service={service} source={source} pager={relatedItemsPager} />
                    ),
                    suffix: 'related',
                });
            }
            tabs.push(
                {
                    tab: 'Info',
                    panel: (
                        <Scrollable>
                            <MediaInfo item={item} />
                        </Scrollable>
                    ),
                    suffix: 'info',
                },
                {
                    tab: 'Details',
                    panel: <MediaDetails item={item} />,
                    suffix: 'details',
                }
            );
        }
        return tabs;
    }, [service, source, item, children, error, relatedItemsPager, relatedPlaylists]);

    return (
        <TabList
            className="media-object-tabs"
            items={tabs}
            label={error ? 'Error' : item?.title || ''}
        />
    );
}
