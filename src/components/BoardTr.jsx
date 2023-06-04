import React, { memo } from "react";
import CardItem from "./CardItem";
       
const BoardTr = memo(({boardData,row,dispatch}) =>{
    console.log('BoardTr',boardData)
    return (
    <tr>
        { boardData.map((card,col)=>(
            <CardItem
              key={`카드번호${card}배열${row}${col}`}
              card={boardData[col]}
              dispatch={dispatch}
              row={row}
              col={col}
            />
        ))
        }
    </tr>)
});
export default BoardTr;