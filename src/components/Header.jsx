import React, { useEffect, useRef, useState } from "react";

export default function Head() {
  const timeout = useRef(null);
  const [time, setTime] = useState({ min: 0, sec: 0 });

  useEffect(() => {
    timeout.current = setInterval(() => {
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
    <div className="w-full h-16 bg-neutral-400">
      <div className="flex w-2/3 bg-neutral-100 rounded-md absolute top-1">
        <div className="flex p-2 w-20 text-lg justify-center items-center font-semibold">
          <p>{timeString}</p>
        </div>
      </div>
    </div>
  );
}
