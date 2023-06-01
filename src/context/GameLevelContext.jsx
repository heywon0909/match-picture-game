import { createContext, useState, useContext } from "react";

const GameLevelContext = createContext();

export function GameLevelContextProvider({ children }) {
  const [level, setLevel] = useState(() => sessionStorage.level);
  const [timeOff, setTimeOff] = useState(false);
  const setGameLevel = (newLevel) => {
    sessionStorage.level = newLevel;
    setLevel(newLevel);
  };
  const closeGame = () => setTimeOff(true);
  return (
    <GameLevelContext.Provider
      value={{ level, setGameLevel, closeGame, timeOff }}
    >
      {children}
    </GameLevelContext.Provider>
  );
}

export function useGameLevelContext() {
  return useContext(GameLevelContext);
}
