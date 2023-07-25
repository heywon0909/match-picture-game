import React, { memo } from "react";
import CardItem from "./CardItem";
import { useGameLevelContext } from "../context/GameLevelContext";

interface TrProps {
  row: number
}


const BoardTr = memo(({ row }:TrProps) => {
  const { boardArr } = useGameLevelContext();

  return (
    <tr>
      {boardArr[row] &&
        boardArr[row]?.map((card, col) => (
          <CardItem
            key={`카드번호${card}배열${row}${col}`}
            row={row}
            col={col}
            card={card}
          />
        ))}
    </tr>
  );
});
export default BoardTr;
