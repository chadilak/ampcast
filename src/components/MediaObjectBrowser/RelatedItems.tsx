import React, {useMemo} from 'react';
import MediaObject from 'types/MediaObject';
import SimplePager from 'services/pagers/SimplePager';
import PagedItems, {PagedItemsProps} from 'components/MediaBrowser/PagedItems';

export default function RelatedItems<T extends MediaObject>({
    source,
    pager,
    emptyMessage = 'Nothing found',
    ...props
}: PagedItemsProps<T>) {
    const relatedSource = useMemo(() => {
        // Copy the underlying source.
        return {
            ...source,
            singular: false,
            isPin: false,
            id: `${source.id}/related`,
            // Not called.
            search() {
                return new SimplePager<T>();
            },
        };
    }, [source]);

    return relatedSource ? (
        <PagedItems {...props} source={relatedSource} pager={pager} emptyMessage={emptyMessage} />
    ) : null;
}
