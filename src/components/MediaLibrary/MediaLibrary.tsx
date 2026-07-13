import React, {memo, useCallback, useEffect, useRef} from 'react';
import {skip} from 'rxjs';
import {WEB_LINKS} from 'services/features';
import {getServiceFromPath, isPersonalMediaService} from 'services/mediaServices';
import AppTitle from 'components/App/AppTitle';
import AppDragRegion from 'components/App/AppDragRegion';
import BrowserControls from 'components/MediaBrowser/BrowserControls';
import BrowserHistory from 'components/MediaBrowser/BrowserHistory';
import MediaSources from 'components/MediaSources';
import Splitter from 'components/Splitter';
import {TreeViewHandle} from 'components/TreeView';
import useHistory from 'components/MediaBrowser/useHistory';
import {ResizeRect} from 'hooks/useOnResize';
import SettingsButton from './SettingsButton';
import WindowControls from 'components/App/WindowControls';
import preferences, {observePreferences} from 'services/preferences';
import useObservable from 'hooks/useObservable';
import './MediaLibrary.scss';

export default memo(function MediaLibrary() {
    const ref = useRef<HTMLDivElement | null>(null);
    const sourcesRef = useRef<TreeViewHandle>(null);
    const {currentPath, navigateTo, switchLibrary} = useHistory();
    const service = getServiceFromPath(currentPath);
    const {showAppTitle} = useObservable(observePreferences, {...preferences});

    useEffect(() => {
        const [path] = currentPath.split('?');
        if (path) {
            sourcesRef.current?.scrollIntoView(path);
        }
    }, [currentPath]);

    useEffect(() => {
        if (service && isPersonalMediaService(service)) {
            const subscription = service
                .observeLibraryId?.()
                .pipe(skip(1))
                .subscribe(switchLibrary);
            return () => subscription?.unsubscribe();
        }
    }, [service, switchLibrary]);

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

    const handleSourcesResize = useCallback(({width}: ResizeRect) => {
        ref.current?.style.setProperty('--sources-width', `${width}px`);
    }, []);

    return (
        <div className="media-library" ref={ref}>
            <header className="media-library-head">
                {showAppTitle && <AppTitle />}
                <AppDragRegion />
                {WEB_LINKS ? <BrowserControls /> : null}
                <SettingsButton />
            </header>
            {showAppTitle && <WindowControls />}
            <div className="media-library-body">
                <Splitter id="media-library-layout" arrange="columns">
                    <MediaSources
                        onClick={navigateTo}
                        onSelect={navigateTo}
                        onResize={handleSourcesResize}
                        ref={sourcesRef}
                    />
                    <BrowserHistory />
                </Splitter>
            </div>
        </div>
    );
});
