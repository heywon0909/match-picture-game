import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="flex w-full h-full bg-cover"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/image/start.jpg)`,
      }}
    >
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex space-x-6">
          <h1 className="text-8xl text-gray-50 font-extrabold tracking-widest">
            G
          </h1>
          <h1 className="text-8xl text-gray-50 font-extrabold tracking-widest">
            A
          </h1>
          <h1 className="text-8xl text-gray-50 font-extrabold tracking-widest">
            M
          </h1>
          <h1 className="text-8xl text-gray-50 font-extrabold tracking-widest">
            E
          </h1>
        </div>
        <Link to="/game/select">
          <div className="flex relative top-8 grayscale-0">
            <button className="w-64 h-10 bg-white  font-extrabold text-2xl rounded-md animate-bounce">
              <p className="text-blue-700 hover:text-indigo-300">start</p>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
