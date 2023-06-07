import React, {memo} from "react";  
import BoardTr from "./BoardTr";
  

  
const BoardTable = memo((boardArr) => {
  return (
    <table className="flex items-center justify-center w-full border-separate border-spacing-2">
      <tbody className="h-table">
        {Array(boardArr.length).fill().map((val, row) => <BoardTr key={row} boardData={boardArr[row]} row={row} />)}
      </tbody>
    </table>
  );
});
export default BoardTable;
  
  