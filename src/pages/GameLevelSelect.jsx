import React, { useRef } from "react";
import { useGameLevelContext } from "../context/GameLevelContext";
import { useNavigate } from "react-router-dom";

export default function GameLevelSelect() {
  const { setGameLevel } = useGameLevelContext();

  const navigate = useNavigate();
  const levelList = useRef(["4 * 4", "4 * 5", "4 * 6"]);
  const onSetGameLevel = (param) => {
    setGameLevel(param);
    navigate(`/game/start`);
  };
  return (
    <div
      className="flex w-full h-full bg-cover grayscale-70"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/image/start.jpg)`,
      }}
    >
      <div className="flex flex-col w-full justify-center items-center">
        <div className="text-gray-800 text-xl font-semibold p-2 animate-pulse -mt-7">
          <h2>레벨을 골라주세요</h2>
        </div>
        <div className="flex flex-col space-y-10">
          {levelList.current.map((level, index) => {
            return (
              <div className="flex grayscale-0" key={index + "번째 레벨"}>
                <button
                  className="w-64 h-10 bg-white  font-extrabold text-3xl rounded-md"
                  onClick={() => onSetGameLevel(level)}
                >
                  <p className="text-blue-700 hover:text-indigo-300">{level}</p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}