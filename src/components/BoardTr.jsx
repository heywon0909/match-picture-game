import React, { memo } from "react";
import CardItem from "./CardItem";
       
const BoardTr = memo(({boardData,row,dispatch}) =>{
    
    return (
    <tr>
        { boardData.map((card,col)=>(
            <CardItem
              key={`카드번호${card}배열${row}${col}`}
              card={boardData[col]}
              row={row}
              col={col}
              dispatch={dispatch}
            />
        ))
        }
    </tr>)
});
export default BoardTr;