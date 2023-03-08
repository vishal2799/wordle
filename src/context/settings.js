import React, { createContext, useState } from 'react';

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const SettingsContext = createContext(undefined);
const SettingsDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function SettingsProvider({ children }) {
  const [isSound, setIsSound] = useState(true);
  const [gameDetails, setGameDetails] = useState({
    username: 'John Doe',
  });

  return (
    <SettingsContext.Provider value={isSound}>
      <SettingsDispatchContext.Provider value={setIsSound}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext, SettingsDispatchContext };
