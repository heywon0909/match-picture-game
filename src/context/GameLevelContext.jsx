import { createContext, useState, useContext, useReducer, useEffect } from "react";

const GameLevelContext = createContext();


export function GameLevelContextProvider({ children }) {
  const [level,setLevel] = useState(()=>{
    sessionStorage.level ? sessionStorage.level.split('*') : "15 * 4"
  })
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
