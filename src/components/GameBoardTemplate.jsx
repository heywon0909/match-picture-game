import React from "react";
import Board from "./Board";
import Head from "./Head";

export default function GameBoardTemplate() {
  return (
    <div className="flex flex-col justify-between bg-brand absolute left-0 right-0 top-0 bottom-0 w-5/6 h-5/6 m-auto border-8 border-neutral-400 rounded-lg">
      <Head />
      <Board />
      <div className="w-full h-16 bg-neutral-400"></div>
    </div>
  );
}
