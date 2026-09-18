import {useCallback} from 'react';
import MediaSource from 'types/MediaSource';

// TODO: Global variable.
let activeSource: MediaSource | undefined;

export default function useActiveSource() {
    const setActiveSource = useCallback((source: MediaSource | undefined) => {
        activeSource = source;
    }, []);

    return [activeSource, setActiveSource] as const;
}
