import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useReducer,
} from "react";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";
import { useGameLevelContext } from '../context/GameLevelContext';
import BoardTr from "./BoardTr";


function getNumber() {
  let randomIndexArr = Array.from({length:30},(v,i)=>i+1);  
  return randomIndexArr;
}
function getRadomArr(numbers) {
  const [row, col] = sessionStorage.level ? sessionStorage.level?.split("*") : [15,10]

  let arr = Array.from({ length: col }, () => Array.from({length:row},()=>0));
  let numbersDoubleArr = [];
  const len = (row * col) / 30;
  numbers.map((value) => {
    
    for (let i = 0; i < len; i++) {
      numbersDoubleArr.push(value);
    }
  });

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      let randomArrIndex = Math.floor(Math.random() * numbersDoubleArr.length);
      arr[i][j] = numbersDoubleArr[randomArrIndex];

      numbersDoubleArr.splice(randomArrIndex, 1);
    }
  }
  return arr;
}
function getBoardCount() {
  const [row, col] = sessionStorage.level
    ? sessionStorage.level.split("*")
    : [4, 4];
  return row * col;
}

const initialState = {
  boardArr:getRadomArr(getNumber()),
  cardArr:[],
  boardCount:getBoardCount()
}
export const CLICK_CARD ='CLICK_CARD';
export const MATCH_CARD='MATCH_CARD';
export const INIT_CARD='INIT_CARD';
const reducer = (state,action) => {
    switch(action.type){
      case CLICK_CARD:{
        const cardArr = [...state.cardArr];
        return {
          ...state,
          cardArr:[...cardArr,action.cardObj]
        }
      }
      case MATCH_CARD:{
        const newBoardArr = [...state.boardArr];
          newBoardArr[action.card_1.row]=[...state.boardArr[action.card_1.row]];
          newBoardArr[action.card_1.row][action.card_1.col] = null;
          if(action.card_1.row === action.card_2.row){
            newBoardArr[action.card_1.row][action.card_2.col] = null;  
          }else{
            newBoardArr[action.card_2.row]=[...state.boardArr[action.card_2.row]];
            newBoardArr[action.card_2.row][action.card_2.col] = null;
          }
          
        return {
          ...state,boardArr:newBoardArr
        }
      }
      case INIT_CARD:{
        console.log('init',state)
        return {
          ...state, cardArr:[]
        }
      }
    }
}



const Board = () => {
  const [state,dispatch] = useReducer(reducer,initialState);
  console.log('state',state)
  const {cardArr,boardArr,totalCount} = state;

  // const [cardArr, setCardArr] = useState([]);
  // const totalCount = useRef(0);
  // totalCount.current = getBoardCount();

  const navigate = useNavigate();
  const timeout = useRef(null);
 
  

 

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
        if((card_1.row === card_2.row) && Math.abs(card_2.col - card_1.col) ===1){
          console.log('맞았습니다.')
          answer = true;
         
        }

        if((card_1.col === card_2.col) && Math.abs(card_2.row - card_1.row) ===1){
          console.log('맞았습니다.')
          answer = true;
         
        }
        console.log('(card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === boardArr.length-1) && (card_1.row !== card_2.row)',(card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === boardArr.length-1) && (card_1.row !== card_2.row))
        if((card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === 14) && (card_1.row !== card_2.row)){
          console.log('맞았습니다.')
          answer = true;
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
      }, 500);
    }
    function GameMatchedCount() {
      let count = 0;
      for (let board of boardArr) {
        for (let card of board) {
          if (card == null) count++;
        }
      }
      if (count === totalCount) navigate("/game/win");
    }
    GameMatchedCount();
    return () => clearTimeout(timeout.current);
  }, [cardArr]);


  return (
    <table className="flex items-center justify-center w-full border-separate border-spacing-2">
      <tbody>
      { Array(boardArr.length).fill().map((val,row)=><BoardTr key={row} boardData={boardArr[row]} row={row} dispatch={dispatch}/>)}
      </tbody>
    </table>
  );
};
export default Board;


