import { createContext, useState, useContext, useReducer, useEffect,useMemo, useCallback } from "react";

export const GameLevelContext = createContext({
  level: [15, 10],
  cardArr: [],
  boardArr: null
});


export const SET_LEVEL = 'SET_LEVEL';
export const SHUFFLE_BOARD = 'SHUFFLE_BOARD';
export const CLICK_CARD = 'CLICK_CARD';
export const MATCH_CARD = 'MATCH_CARD';
export const INIT_CARD='INIT_CARD';

const getNumber = () => Array.from({ length: 30 }, (_v, i) => i + 1);
const getRandomArr = (numbers, level) => {
  const [row, col] = level;
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
      arr[i][j] = {value: numbersDoubleArr[randomArrIndex], on : false};

      numbersDoubleArr.splice(randomArrIndex, 1);
    }
  }
  return arr;
}

const shuffleBoard = (boardArr) => {
   let newBoardArr = Array.from({ length: 15 }, () => Array.from({length:(boardArr[0]/15)},()=>0));
    let boardFlatArr= boardArr.flat();
    for(let i=0;i<boardArr.length;i++){
      for(let j=0;j<boardArr[i].length;j++){
       let randomArrIndex =Math.floor(Math.random() * boardFlatArr.length);
        newBoardArr[i][j] = {value: boardFlatArr[randomArrIndex].value,on:false};
        boardFlatArr.splice(randomArrIndex,1);
      }
    }
    return newBoardArr;
}


const initialState = {
  level: sessionStorage.level.split(',').map(v=>Number(v)) || [15, 10],
  cardArr: [],
  boardArr: getRandomArr(getNumber(),sessionStorage.level.split(',').map(v=>Number(v)) || [15, 10])
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        cardArr: [],
        boardArr: getRandomArr(getNumber(), action.level),
        level: [...action.level],
      }
    case SHUFFLE_BOARD:
      return {
        ...state,
        cardArr: [],
        boardArr: shuffleBoard([...state.boardArr]),
      }
    case CLICK_CARD:
      let cardArr = [];
      let boardArr = [...state.boardArr];
      let newBoard = null;
      if (state.cardArr.length >= 2) {
        cardArr = [...state.cardArr];
      } else {
        cardArr = [...state.cardArr, action.cardObj];
        boardArr[action.cardObj.row] = [...state.boardArr[action.cardObj.row]];
        boardArr[action.cardObj.row][action.cardObj.col] = { value: action.cardObj.card, on: true }
      }
       
      return {
        ...state,
        boardArr,
        cardArr
      }
    case MATCH_CARD:{
      const newBoardArr = [...state.boardArr];
      newBoardArr[action.card_1.row] = [...state.boardArr[action.card_1.row]];
      newBoardArr[action.card_1.row][action.card_1.col] = { value: null, on: false };
      if (action.card_1.row === action.card_2.row) {
        newBoardArr[action.card_1.row][action.card_2.col] = { value: null, on: false };
      } else {
        newBoardArr[action.card_2.row] = [...state.boardArr[action.card_2.row]];
        newBoardArr[action.card_2.row][action.card_2.col] = { value: null, on: false };
      }
          
      return {
        ...state, boardArr: newBoardArr
      }
    }
      case INIT_CARD: {
        const boardArr = [...state.boardArr];
        const [card1, card2] = [...state.cardArr];
        boardArr[card1.row] = [...state.boardArr[card1.row]];
        boardArr[card1.row][card1.col] = { value: null, on: false };
        if (card1.row === card2.row) {
          boardArr[card1.row][card2.col] = { value: null, on: false };
        } else {
          boardArr[card2.row] = [...state.boardArr[card2.row]];
          boardArr[card2.row][card2.col] = { value: null, on: false };
        }
       
        return {
          ...state, boardArr, cardArr: []
        }
      }  
    }


}



export function GameLevelContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timeOff, setTimeOff] = useState(false);
  const { level, boardArr, cardArr } = state;
  
  const closeGame = useCallback(() => setTimeOff(true),[]);
  const value = useMemo(() => ({
    boardArr,
    level,
    cardArr,
    timeOff,
    closeGame,
    dispatch
  }),[boardArr,level,cardArr,timeOff])


  return (
    <GameLevelContext.Provider
      value={ value }
    >
      {children}
    </GameLevelContext.Provider>
  );
}

export function useGameLevelContext() {
  return useContext(GameLevelContext);
}
