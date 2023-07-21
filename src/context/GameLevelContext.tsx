import * as React from 'react'
import {
  createContext,
  useState,
  useContext,
  useReducer,
  useEffect,
  Dispatch,
  FC,
  useMemo,
  useCallback,
} from "react";
import { SET_LEVEL,SHUFFLE_BOARD,CLICK_CARD,MATCH_CARD,INIT_CARD,row,col,cardObjState,cardState,ReducerActions} from './action';



interface Context{
  level: [row,col],
  cardArr: cardObjState[],
  boardArr: cardState[][],
  dispatch: Dispatch<ReducerActions>,
  timeOff: boolean,
  closeGame: () => void
}

export const GameLevelContext = createContext<Context>({
  level: [15,10],
  cardArr: [],
  boardArr: [],
  dispatch: () => {},
  timeOff: false,
  closeGame: () => {}
})



const getNumber = () => Array.from({ length: 30 }, (_v, i) => i + 1);
const getRandomArr = (numbers:number[], level:[row,col]) => {
  const [row, col] = level;
  let arr: cardState[][] = Array.from({ length: col }, () => Array.from({ length: row }, () => ({ value: 0, on: false })));
  let numbersDoubleArr:number[] = [];
  const len = (row * col) / 30;
  numbers.map((value:number) => {
    for (let i = 0; i < len; i++) {
      numbersDoubleArr.push(value);
    }
  });
  if (len % 2 !== 0) {
    const left = len % 2;
    const numArr = [...numbers];
    const numberTmp = [];
    for (let i = 0; i < left * 15; i++) {
      let randomIndex = Math.floor(Math.random() * numArr.length);

      numberTmp.push(numArr[randomIndex]);
      numArr.splice(randomIndex, 1);
    }

    numberTmp.map((value) => {
      for (let i = 0; i < 2; i++) {
        numbersDoubleArr.push(value);
      }
    });
  }

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      let randomArrIndex = Math.floor(Math.random() * numbersDoubleArr.length);
      arr[i][j] = { value: numbersDoubleArr[randomArrIndex], on: false };

      numbersDoubleArr.splice(randomArrIndex, 1);
    }
  }
  return arr;
};

const shuffleBoard = (boardArr:cardState[][]) => {
  console.log("board", boardArr);
  let newBoardArr = Array.from({ length: boardArr.length }, () =>
    Array.from({ length: boardArr[0].length }, () => ({value:0,on:false}))
  );
  let boardFlatArr = boardArr.flat();
  for (let i = 0; i < boardArr.length; i++) {
    for (let j = 0; j < boardArr[i].length; j++) {
      let randomArrIndex = Math.floor(Math.random() * boardFlatArr.length);
      newBoardArr[i][j] = {
        value: boardFlatArr[randomArrIndex].value as number,
        on: false,
      };
      boardFlatArr.splice(randomArrIndex, 1);
    }
  }
  return newBoardArr;
};

interface ReducerState {
  level: [row,col];
  cardArr: cardObjState[];
  boardArr: cardState[][];
}
const initialState: ReducerState = {
  level: sessionStorage.level
    ? sessionStorage.level.split(",").map((v: string) => Number(v))
    : [15, 12],
  cardArr: [],
  boardArr: getRandomArr(
    getNumber(),
    sessionStorage.level
      ? sessionStorage.level.split(",").map((v: string) => Number(v))
      : [15, 12]
  ),
};





const reducer = (state = initialState, action:ReducerActions):ReducerState => {
  switch (action.type) {
    case SET_LEVEL:
    
      return {
        ...state,
        cardArr: [],
        boardArr: getRandomArr(getNumber(), action.level),
        level:[15,10] 
      };
    case SHUFFLE_BOARD:
      return {
        ...state,
        cardArr: [],
        boardArr: shuffleBoard([...state.boardArr]),
      };
    case CLICK_CARD:
      let cardArr = [];
      let boardArr = [...state.boardArr];
      let newBoard = null;
      if (state.cardArr.length >= 2) {
        cardArr = [...state.cardArr];
      } else {
        cardArr = [...state.cardArr, action.cardObj];
        boardArr[action.cardObj.row] = [...state.boardArr[action.cardObj.row]];
        boardArr[action.cardObj.row][action.cardObj.col] = {
          value: action.cardObj.card,
          on: true,
        };
      }

      return {
        ...state,
        boardArr,
        cardArr,
      };
    case MATCH_CARD: {
      const newBoardArr = [...state.boardArr];
      newBoardArr[action.card_1.row] = [...state.boardArr[action.card_1.row]];
      newBoardArr[action.card_1.row][action.card_1.col] = {
        value: null,
        on: false,
      };
      if (action.card_1.row === action.card_2.row) {
        newBoardArr[action.card_1.row][action.card_2.col] = {
          value: null,
          on: false,
        };
      } else {
        newBoardArr[action.card_2.row] = [...state.boardArr[action.card_2.row]];
        newBoardArr[action.card_2.row][action.card_2.col] = {
          value: null,
          on: false,
        };
      }

      return {
        ...state,
        boardArr: newBoardArr,
      };
    }
    // case WRONG_MATCH: {
    // }
    case INIT_CARD: {
      const boardArr = [...state.boardArr];
      const [card1, card2] = [...state.cardArr];
      boardArr[card1.row] = [...state.boardArr[card1.row]];
      boardArr[card1.row][card1.col] = {
        ...boardArr[card1.row][card1.col],
        on: false,
      };
      if (card1.row === card2.row) {
        boardArr[card1.row][card2.col] = {
          ...boardArr[card1.row][card2.col],
          on: false,
        };
      } else {
        boardArr[card2.row] = [...state.boardArr[card2.row]];
        boardArr[card2.row][card2.col] = {
          ...boardArr[card2.row][card2.col],
          on: false,
        };
      }

      return {
        ...state,
        boardArr,
        cardArr: [],
      };
    }
  }
};

export const GameLevelContextProvider = ({ children }:{children:React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timeOff, setTimeOff] = useState(false);
  const { level, boardArr, cardArr } = state;

  const closeGame = useCallback(() => setTimeOff(true), []);
  const value = useMemo(
    () => ({boardArr,
      level,
      cardArr,
      timeOff,
      closeGame,
      dispatch}),
    [boardArr, level, cardArr, timeOff]
  );

  return (
    <GameLevelContext.Provider value={value}>
      {children}
    </GameLevelContext.Provider>
  );
}


export function useGameLevelContext() {
  return useContext(GameLevelContext);
}
