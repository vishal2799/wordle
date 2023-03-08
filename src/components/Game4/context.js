import React, { createContext, useState } from 'react';

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const GameContext = createContext(undefined);
const GameDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function GameProvider({ children }) {
  const [todayComplete, setTodayComplete] = useState(false);
  const [gameDetails, setGameDetails] = useState({
    username: 'John Doe',
  });

  return (
    <GameContext.Provider value={[gameDetails, todayComplete]}>
      <GameDispatchContext.Provider value={[setGameDetails, setTodayComplete]}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export { GameProvider, GameContext, GameDispatchContext };
