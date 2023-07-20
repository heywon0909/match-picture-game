import React from "react";
import TimeSetting from "./TimeSetting";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <div className="w-full h-16 bg-neutral-400">
      {pathname === "/game/start" && <TimeSetting />}
    </div>
  );
}
