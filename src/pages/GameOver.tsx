import React from "react";
import { Link } from "react-router-dom";
export default function GameOver() {
  return (
    <div
      className="flex w-full h-full bg-cover"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/image/start.jpg)`,
      }}
    >
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex space-x-6">
          <h1 className="text-8xl text-pink-500 font-extrabold tracking-widest animate-bounce">
            L
          </h1>
          <h1 className="text-8xl text-pink-500 font-extrabold tracking-widest animate-bounce">
            O
          </h1>
          <h1 className="text-8xl text-pink-500 font-extrabold tracking-widest animate-bounce">
            S
          </h1>
          <h1 className="text-8xl text-pink-500 font-extrabold tracking-widest animate-bounce">
            E
          </h1>
        </div>
        <Link to="/game/select">
          <div className="flex relative top-8 grayscale-0">
            <button className="w-64 h-10 bg-white  font-extrabold text-2xl rounded-md">
              <p className="text-blue-700 hover:text-indigo-300 animate-pulse">
                restart
              </p>
            </button>
          </div>
        </Link>
        <Link to="/">
          <div className="flex relative top-8 grayscale-0 pt-5">
            <button className="w-64 h-10 bg-white  font-extrabold text-2xl rounded-md">
              <p className="text-purple-700 hover:text-indigo-300 animate-pulse">
                Home
              </p>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
