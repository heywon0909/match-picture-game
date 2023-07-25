import GameBoardTemplate from "./components/GameBoardTemplate";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Bottom from "./components/Bottom";
import { GameLevelContextProvider } from "./context/GameLevelContext";
import React from "react";

const App = () => {
  return (
    <div className="w-full h-screen relative">
      <div className="flex flex-col justify-between bg-brand absolute left-0 right-0 top-0 bottom-0 w-11/12 h-custom  m-auto border-8 border-neutral-400 rounded-lg">
        <GameLevelContextProvider>
          <Header />
          <Outlet />
        </GameLevelContextProvider>
        <Bottom />
      </div>
    </div>
  );
};

export default App;
