import React, { useEffect, useRef, useState } from "react";

export default function Head() {
  const timeout = useRef(null);
  const [time, setTime] = useState({ min: 0, sec: 0 });

  useEffect(() => {
    timeout.current = setInterval(() => {
      setTime((prevTime) => {
        const newSec = prevTime.sec === 59 ? 0 : prevTime.sec + 1;
        const newMin = prevTime;
      });
      setSec((prev) => {
        if (prev === 60) return 0;
        else return prev + 1;
      });
      setMin((prev) => {
        if (Number(sec) === 60) {
          return prev + 1;
        } else return prev;
      });
    }, 1000);
    return () => clearInterval(timeout.current);
  }, [sec]);

  const timeSetting = () => {
    const fmtMin = min < 10 ? "0" + min : min;
    const fmtSec = sec < 10 ? "0" + sec : sec;
    return fmtMin + ":" + fmtSec;
  };
  return (
    <div className="w-full h-16 bg-neutral-400">
      <div className="flex w-2/3 bg-neutral-100 rounded-md absolute top-1">
        <div className="flex p-2 w-20 text-lg justify-center items-center font-semibold">
          <p>{timeSetting()}</p>
        </div>
      </div>
    </div>
  );
}
