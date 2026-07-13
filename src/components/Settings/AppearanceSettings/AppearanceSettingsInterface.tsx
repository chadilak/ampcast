import React, {useCallback, useId, useEffect, useMemo, useRef} from 'react';
import preferences from 'services/preferences';
import DialogButtons from 'components/Dialog/DialogButtons';

export default function AppearanceSettingsInterface() {
    const id = useId();
    const submitted = useRef(false);
    const originalShowSmiley = useMemo(() => preferences.showSmiley, []);
    const originalShowAppTitle = useMemo(() => preferences.showAppTitle, []);

    useEffect(() => {
        return () => {
            if (!submitted.current) {
                preferences.showSmiley = originalShowSmiley;
                preferences.showAppTitle = originalShowAppTitle;
            }
        };
    }, [originalShowSmiley, originalShowAppTitle]);

    const handleSubmit = useCallback(() => {
        submitted.current = true;
    }, []);

    return (
        <form className="appearance-settings-interface" method="dialog" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Header</legend>
                <p>
                    <input
                        type="checkbox"
                        id={`${id}-show-app-title`}
                        defaultChecked={originalShowAppTitle}
                        onChange={(e) => (preferences.showAppTitle = e.target.checked)}
                    />
                    <label htmlFor={`${id}-show-app-title`}>Show app title</label>
                </p>
            </fieldset>
            <fieldset>
                <legend>Playback</legend>
                <p>
                    <input
                        type="checkbox"
                        id={`${id}-show-smiley`}
                        defaultChecked={originalShowSmiley}
                        onChange={(e) => (preferences.showSmiley = e.target.checked)}
                    />
                    <label htmlFor={`${id}-show-smiley`}>Show smiley face on seek bar</label>
                </p>
            </fieldset>
            <DialogButtons />
        </form>
    );
}
