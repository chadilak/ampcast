import {useEffect, useState} from 'react';
import {defer, filter, mergeMap, of, tap} from 'rxjs';
import ItemType from 'types/ItemType';
import LinearType from 'types/LinearType';
import MediaItem from 'types/MediaItem';
import MediaObject from 'types/MediaObject';
import {Logger} from 'utils';
import listenbrainzApi from 'services/listenbrainz/listenbrainzApi';
import {dispatchMetadataChanges, observeMetadataChange} from 'services/metadata';
import {getServiceFromSrc} from 'services/mediaServices';
import stationStore from 'services/internetRadio/stationStore';

const logger = new Logger('useActiveItem');

export default function useActiveItem<T extends MediaObject | null>(
    item: T,
    addMetadata?: boolean
): T {
    const [activeItem, setActiveItem] = useState<T>(item);

    useEffect(() => {
        if (item) {
            if (addMetadata) {
                const subscription = defer(() => of(item))
                    .pipe(
                        tap((item) => setActiveItem(item)),
                        mergeMap((item) => addServiceMetadata(item)),
                        tap((item) => setActiveItem(item)),
                        filter((item) => item.itemType === ItemType.Media),
                        mergeMap((item) => listenbrainzApi.addMetadata(item as MediaItem)),
                        tap((item) => setActiveItem(item as T))
                    )
                    .subscribe(logger);
                return () => subscription.unsubscribe();
            }
        } else {
            setActiveItem(item as T);
        }
    }, [item, addMetadata]);

    useEffect(() => {
        if (activeItem) {
            const subscription = observeMetadataChange(activeItem)
                .pipe(tap((values) => setActiveItem({...activeItem, ...values})))
                .subscribe(logger);

            return () => subscription.unsubscribe();
        }
    }, [activeItem]);

    return activeItem;
}

async function addServiceMetadata<T extends MediaObject>(item: T): Promise<T> {
    try {
        const prevItem = item;
        const service = getServiceFromSrc(item);
        if (service?.addMetadata) {
            item = await service.addMetadata?.(item);
        }
        if (
            item.itemType === ItemType.Media &&
            item.linearType === LinearType.Station &&
            item.isFavoriteStation === undefined
        ) {
            item = {...item, isFavoriteStation: stationStore.isFavorite(item)};
        }
        let changed = false;
        const values: Partial<T> = {};
        const keys = Object.keys(item) as (keyof T)[];
        keys.forEach((key) => {
            if (item[key] !== prevItem[key]) {
                changed = true;
                values[key] = item[key];
            }
        });
        if (changed) {
            dispatchMetadataChanges({
                match: (object) => object.src === item.src,
                values,
            });
        }
    } catch (err) {
        logger.error(err);
    }
    return item;
}
