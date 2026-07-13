const {contextBridge, ipcRenderer} = require('electron');

ipcRenderer.on('noctalia-theme', (_, raw) => {
    try {
        localStorage.setItem('ampcast/theme/noctalia-live', raw);
        window.dispatchEvent(new Event('noctalia-theme-update'));
    } catch (e) {
        console.error('[Noctalia] Failed to update theme:', e);
    }
});

contextBridge.exposeInMainWorld('ampcastElectron', {
    quit: () => ipcRenderer.send('quit'),
    minimize: () => ipcRenderer.send('minimize'),
    toggleMaximize: () => ipcRenderer.send('toggleMaximize'),
    disableLoopbackAudio: () => ipcRenderer.invoke('disable-loopback-audio'),
    enableLoopbackAudio: () => ipcRenderer.invoke('enable-loopback-audio'),
    getCredential: (key) => ipcRenderer.invoke('getCredential', key),
    setCredential: (key, value) => ipcRenderer.invoke('setCredential', key, value),
    clearCredentials: () => ipcRenderer.invoke('clearCredentials'),
    setFontSize: (fontSize) => ipcRenderer.send('setFontSize', fontSize),
    setFrameColor: (color) => ipcRenderer.send('setFrameColor', color),
    setFrameTextColor: (color) => ipcRenderer.send('setFrameTextColor', color),
    getLocalhostIP: () => ipcRenderer.invoke('getLocalhostIP'),
    getPreferredPort: () => ipcRenderer.invoke('getPreferredPort'),
    setPreferredPort: (port) => ipcRenderer.invoke('setPreferredPort', port),
});
