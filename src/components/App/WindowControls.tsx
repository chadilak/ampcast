import React, {memo} from 'react';
import ampcastElectron from 'services/ampcastElectron';
import './WindowControls.scss';

export default memo(function WindowControls() {
    const electron = ampcastElectron;
    if (!electron) {
        return null;
    }
    return (
        <div className="window-controls">
            <button
                className="window-control window-control-minimize"
                title="Minimize"
                onClick={() => electron.minimize()}
            >
                &#x2212;
            </button>
            <button
                className="window-control window-control-maximize"
                title="Maximize"
                onClick={() => electron.toggleMaximize()}
            >
                &#x25A1;
            </button>
            <button
                className="window-control window-control-close"
                title="Close"
                onClick={() => electron.quit()}
            >
                &#x2715;
            </button>
        </div>
    );
});
