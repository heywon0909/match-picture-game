import React from "react";

export default function Home() {
  return (
    <div
      className="flex w-full h-full bg-cover grayscale-70"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/image/start.jpg)`,
      }}
    >
      <div className="flex w-full justify-center items-center">
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
      </div>
    </div>
  );
}
