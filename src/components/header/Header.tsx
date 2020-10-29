import React, { useState, useEffect } from 'react';
import TitleBar from 'frameless-titlebar';
import { remote } from 'electron';

const currentWindow = remote.getCurrentWindow();

export const Header = () => {
  // manage window state, default to currentWindow maximized state
  const [maximized, setMaximized] = useState(currentWindow.isMaximized());
  // add window listeners for currentWindow
  useEffect(() => {
    const onMaximized = () => setMaximized(true);
    const onRestore = () => setMaximized(false);
    currentWindow.on('maximize', onMaximized);
    currentWindow.on('unmaximize', onRestore);
    return () => {
      currentWindow.removeListener('maximize', onMaximized);
      currentWindow.removeListener('unmaximize', onRestore);
    };
  }, []);

  // used by double click on the titlebar
  // and by the maximize control button
  const handleMaximize = () => {
    if (maximized) {
      currentWindow.restore();
    } else {
      currentWindow.maximize();
    }
  };

  return (
    <div>
      <TitleBar
        currentWindow={currentWindow} // electron window instance
        platform={process.platform} // win32, darwin, linux
        title='acryptex'
        onClose={() => currentWindow.close()}
        onMinimize={() => currentWindow.minimize()}
        onMaximize={handleMaximize}
        onDoubleClick={handleMaximize}
        disableMinimize={false}
        disableMaximize={false}
        maximized={maximized}
      />
    </div>
  );
};
