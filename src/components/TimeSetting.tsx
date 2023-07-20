import React, { useEffect, useRef, useState } from "react";
import { useGameLevelContext } from "../context/GameLevelContext";
import { useNavigate } from "react-router-dom";
export default function TimeSetting() {
  const timeout = useRef(null);
  const [time, setTime] = useState({ min: 0, sec: 0 });

  const { closeGame } = useGameLevelContext();

  const navigate = useNavigate();

  useEffect(() => {
    timeout.current = setInterval(() => {
      if (time.min === 5 && time.sec === 30) {
        closeGame();
        clearInterval(timeout.current);
        timeout.current = null;
        navigate("/game/over");
      }
      setTime((prevTime) => {
        const newSec = prevTime.sec === 59 ? 0 : prevTime.sec + 1;
        const newMin = prevTime.sec === 59 ? prevTime.min + 1 : prevTime.min;
        return { min: newMin, sec: newSec };
      });
    }, 1000);
    return () => clearInterval(timeout.current);
  }, [time]);

  const timeSetting = (time) => {
    return time < 10 ? "0" + time : time;
  };

  const timeString = `${timeSetting(time.min)}:${timeSetting(time.sec)}`;

  return (
    <div className="flex w-2/3 bg-neutral-100 rounded-md absolute top-1">
      <div className="flex p-2 w-20 text-lg justify-center items-center font-semibold">
        <p>{timeString}</p>
      </div>
    </div>
  );
}
