import React, {useCallback} from 'react';
import {ListViewHandle} from 'components/ListView';
import {IconButtons} from 'components/Button';
import {SettingsDialog} from 'components/Settings';
import {showDialog} from 'components/Dialog';
import useCurrentlyPlaying from 'hooks/useCurrentlyPlaying';
import usePlaybackState from 'hooks/usePlaybackState';
import MediaButton from './MediaButton';
import MediaButtons from './MediaButtons';
import PlaylistMenuButton from './PlaylistMenuButton';
import RadioButtons from './RadioButtons';
import TimeControl from './TimeControl';
import VolumeControl from './VolumeControl';
import './MediaControls.scss';
import './MediaControls-overlay.scss';

export interface MediaControlsProps {
    overlay?: boolean;
    playlistRef?: React.RefObject<ListViewHandle | null>;
}

export default function MediaControls({overlay, playlistRef}: MediaControlsProps) {
    const currentlyPlaying = useCurrentlyPlaying();
    const {paused} = usePlaybackState();

    const openSettingsDialog = useCallback(() => {
        showDialog(SettingsDialog, true);
    }, []);

    return (
        <div className={`media-controls${overlay ? '-overlay' : ''}`}>
            <TimeControl overlay={overlay} />
            <div className="playback-control">
                <VolumeControl overlay={overlay} />
                {overlay ? (
                    <>
                        <IconButtons className="media-buttons">
                            <MediaButtons overlay={overlay} />
                        </IconButtons>
                        {currentlyPlaying?.skippable && !paused ? (
                            <IconButtons className="radio-buttons">
                                <RadioButtons overlay />
                            </IconButtons>
                        ) : null}
                    </>
                ) : (
                    <div className="media-buttons">
                        <MediaButtons overlay={overlay} playlistRef={playlistRef} />
                    </div>
                )}
                {!overlay && playlistRef ? (
                    <div className="media-controls-menu">
                        <MediaButton
                            title="Settings"
                            icon="settings"
                            className="media-button-menu"
                            onClick={openSettingsDialog}
                        />
                        <PlaylistMenuButton playlistRef={playlistRef} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
