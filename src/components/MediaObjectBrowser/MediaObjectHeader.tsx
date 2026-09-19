import React, {useCallback, useContext} from 'react';
import MediaObject from 'types/MediaObject';
import MediaSource from 'types/MediaSource';
import {
    ShowActionsMenuContext,
    ShowActionsMenuParams,
    showHeaderMenu,
    SyntheticAlbumContext,
} from 'components/Actions';

export interface MediaObjectHeaderProps {
    source: MediaSource<any> | undefined;
    item: MediaObject | undefined;
    children: React.ReactNode;
}

export default function MediaObjectHeader({source, item, children}: MediaObjectHeaderProps) {
    const {syntheticAlbum} = useContext(SyntheticAlbumContext);

    const showMenu = useCallback(
        async ({target, x, y}: ShowActionsMenuParams<MediaObject>) => {
            return item ? showHeaderMenu({source, item, syntheticAlbum, target, x, y}) : undefined;
        },
        [source, item, syntheticAlbum]
    );

    return (
        <header className="media-object-header">
            <ShowActionsMenuContext value={showMenu}>{children}</ShowActionsMenuContext>
        </header>
    );
}
