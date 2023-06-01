import { createContext, useState, useContext } from "react";

const GameLevelContext = createContext();

export function GameLevelContextProvider({ children }) {
  const [level, setLevel] = useState(() => sessionStorage.level);
  const setGameLevel = (newLevel) => {
    sessionStorage.level = newLevel;
    setLevel(newLevel);
  };
  return (
    <GameLevelContext.Provider value={{ level, setGameLevel }}>
      {children}
    </GameLevelContext.Provider>
  );
}

export function useGameLevelContext() {
  return useContext(GameLevelContext);
}
