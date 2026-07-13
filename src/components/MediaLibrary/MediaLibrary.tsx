import React, {memo, useEffect, useState} from 'react';
import AppTitle from 'components/App/AppTitle';
import AppDragRegion from 'components/App/AppDragRegion';
import WindowControls from 'components/App/WindowControls';
import Splitter from 'components/Splitter';
import MediaSources, {MediaSourceView} from 'components/MediaSources';
import preferences, {observePreferences} from 'services/preferences';
import useObservable from 'hooks/useObservable';
import './MediaLibrary.scss';

export default memo(function MediaLibrary() {
    const [source, setSource] = useState<MediaSourceView | null>(null);
    const {showAppTitle} = useObservable(observePreferences, {...preferences});

    useEffect(() => {
        document.body.classList.toggle('show-app-title', showAppTitle);
    }, [showAppTitle]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key === 'm') {
                e.preventDefault();
                preferences.showAppTitle = !preferences.showAppTitle;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="media-library">
            <header className="media-library-head">
                {showAppTitle && <AppTitle />}
                <AppDragRegion />
            </header>
            {showAppTitle && <WindowControls />}
            <div className="media-library-body">
                <Splitter id="media-library-layout" arrange="columns">
                    <MediaSources onSelect={setSource} />
                    {source?.view || <div className="panel" />}
                </Splitter>
            </div>
        </div>
    );
});
