import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  useRef,
  useReducer,
} from "react";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";
import { useGameLevelContext } from '../context/GameLevelContext';
import BoardTr from "./BoardTr";
import { MATCH_CARD, INIT_CARD,SHUFFLE_BOARD } from '../context/GameLevelContext';






const Board = () => {

  const { boardArr, level, cardArr, dispatch } = useGameLevelContext();
  console.log('boardArr',boardArr)
  let boardCount = useRef(null);
  const [row, col] = level;
  boardCount.current = row * col;


  const navigate = useNavigate();
  const timeout = useRef(null);
  const checkArr= useRef([]);
  checkArr.current = Array.from({length:(boardCount.current/15)},()=>Array.from({length:15},()=>0))
  
  

 

  useEffect(() => {
    console.log('카드',cardArr)
    if (cardArr.length === 2) {
      const [card_1, card_2] = cardArr;
      console.log('cardArr',cardArr)
      let answer = false;
      if (card_1.card === card_2.card && (card_1.row !== card_2.row || card_1.col !== card_2.col)) {
        // 같은 행일때
        if((card_1.row === card_2.row) && (card_2.col !== card_1.col) && (card_1.row === 0 || card_1.row === boardArr.length-1)){
          console.log('맞았습니다.');
          answer = true;
        }

        // 같은 열일때
        if(!answer && (card_1.row === card_2.row) && Math.abs(card_2.col - card_1.col) ===1){
          console.log('맞았습니다.')
          answer = true;
         
        }

        if(!answer && (card_1.row === card_2.row)){
           if(card_2.col > card_1.col){
            let index = card_2.col;
            while(index>card_1.col){
              if(boardArr[card_1.row][index] == null){
                index--;
              }else{
                break;
              }
            }
            if(boardArr[card_1.row][card_1.col] === boardArr[card_1.row][index]){
              console.log('맞았습니다.')
              answer = true;
            }
           }else{
            let index = card_1.col;
            while(index>card_2.col){
              if(boardArr[card_2.row][index] == null){
                index--;
              }else{
                break;
              }
            }
            if(boardArr[card_2.row][card_2.col] === boardArr[card_2.row][index]){
              console.log('맞았습니다.')
              answer = true;
            }
           }
        }

        if(!answer && (card_1.col === card_2.col) && Math.abs(card_2.row - card_1.row) ===1){
          console.log('맞았습니다.')
          answer = true;
         
        }

        if(!answer && (card_1.col === card_2.col)){
          if(card_2.row > card_1.row){
           let index = card_2.row;
           while(index>card_1.row){
             if(boardArr[index][card_1.col] == null){
               index--;
             }else{
               break;
             }
           }
           if(boardArr[card_1.row][card_1.col] === boardArr[index][card_1.col]){
             console.log('맞았습니다.')
             answer = true;
           }
          }else{
           let index = card_1.row;
           while(index>card_2.row){
             if(boardArr[index][card_2.col] == null){
               index--;
             }else{
               break;
             }
           }
           if(boardArr[card_2.row][card_2.col] === boardArr[index][card_2.col]){
             console.log('맞았습니다.')
             answer = true;
           }
          }
       }

        console.log('(card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === boardArr.length-1) && (card_1.row !== card_2.row)',(card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === boardArr.length-1) && (card_1.row !== card_2.row))
        if(!answer && (card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === 14) && (card_1.row !== card_2.row)){
          console.log('맞았습니다.')
          answer = true;
        }   

        if (!answer) {
          console.log('타니')
          const cardList = cardArr.sort((a, b) => a.row - b.row);
          const [card1, card2] = cardList;
          const start_row = Math.min(card1.row,card2.row);
          const end_row = Math.max(card1.row,card2.row);
          const start_col = Math.min(card1.col,card2.col);
          const end_col = Math.max(card1.col,card2.col);
        
          const updatedCheckArr = [...checkArr.current]; // 새로운 배열 생성
        
          for (let i = start_row; i <= end_row; i++) {
            const newRow = [...updatedCheckArr[i]]; // 새로운 행 생성
            for (let j = start_col; j <= end_col; j++) {
              if (boardArr[i][j] == null) {
                newRow[j] = 1; // 요소 수정
              }
            }
            updatedCheckArr[i] = newRow; // 수정된 행을 새로운 배열에 할당
          }
        
          checkArr.current = updatedCheckArr; // 업데이트된 배열 할당
          console.log('check',checkArr.current)

          let dx =[-1,0,1,0];
          let dy =[0,1,0,-1];
          const dfs = (x,y) => {
            if(x===card2.row && y===card2.col){
               console.log('맞았습니다.');
               answer = true;
            }else{
              for(let k=0;k<4;k++){
                let nx = x + dx[k];
                let ny = y + dy[k];
                console.log('nx')
                if(nx>=start_row&&nx<=end_row&&ny>=start_col&&ny<=end_row&&checkArr[nx][ny]===1){
                  let updatedCheckArr = [...checkArr.current];
                  const newRow = [...updatedCheckArr[nx]];
                  newRow[ny] = 0;
                  checkArr.current = updatedCheckArr; 
                  dfs(nx,ny);
                  let updatedCheckArr1 = [...checkArr.current];
                  const newRow1 = [...updatedCheckArr1[nx]];
                  newRow1[ny] = 1;
                  checkArr.current = updatedCheckArr1; 
                }
              }

            }
          }

          dfs(card1.row,card1.col);
        }
        
       

        
        if(answer){
          dispatch({type:MATCH_CARD,card_1,card_2})
        }else{
          console.log("틀렸습니다.");
        }
        
      } else {
        console.log("틀렸습니다.");
      }
      timeout.current = setTimeout(() => {
        dispatch({type:INIT_CARD})
      }, 200);
    }
    function GameMatchedCount() {
      let count = 0;
      for (let board of boardArr) {
        for (let card of board) {
          if (card == null) count++;
        }
      }
      if (count === boardCount) navigate("/game/win");
    }
    GameMatchedCount();
    return () => {
      if(timeout.current){
        clearTimeout(timeout.current);
      }
      }
  }, [cardArr]);

  const onShuffle = useCallback(() => {
    dispatch({type:SHUFFLE_BOARD})
  },[])


  return (
    <div className="block">
    <div onClick={onShuffle} className="mt-2 p-2 w-20 h-6 text-sm rounded-md bg-purple-800 text-white flex justify-center items-center relative left-0">shuffle</div>
    <table className="flex items-center justify-center w-full border-separate border-spacing-2">
      <tbody className="h-table">
      { Array(boardArr.length).fill().map((val,row)=><BoardTr key={row} boardData={boardArr[row]} row={row} dispatch={dispatch}/>)}
      </tbody>
    </table>
    </div> 
  );
};
export default Board;


