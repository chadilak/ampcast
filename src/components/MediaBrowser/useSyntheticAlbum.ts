import {useCallback} from 'react';
import MediaAlbum from 'types/MediaAlbum';

// THis provides a way to hijack the view menus so that we can
// provide tailored views for each type of synthetic album.
// Synthetic albums are created by ampcast to group specific artist
// tracks together.
// e.g. "All Tracks", "Videos", "Radios".

// TODO: Global variable.
let syntheticAlbum: MediaAlbum | undefined;

export default function useSyntheticAlbum() {
    const setSyntheticAlbum = useCallback((album: MediaAlbum | undefined) => {
        syntheticAlbum = album;
    }, []);

    return [syntheticAlbum, setSyntheticAlbum] as const;
}
