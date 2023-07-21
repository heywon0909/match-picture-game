import React, { memo } from "react";
import BoardTr from "./BoardTr";
import { useGameLevelContext } from "../context/GameLevelContext";

const BoardTable = memo(() => {
  const { boardArr } = useGameLevelContext();
  return (
    <table className="flex items-center justify-center w-full border-separate border-spacing-2">
      <tbody className="h-table">
        {Array(boardArr.length)
          .fill(null)
          .map((val, row) => (
            <BoardTr key={row} row={row} />
          ))}
      </tbody>
    </table>
  );
});
export default BoardTable;
