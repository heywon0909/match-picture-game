import * as React from 'react'
import {
  createContext,
  useState,
  useContext,
  useReducer,
  useEffect,
  FC,
  useMemo,
  useCallback,
} from "react";

export const CODE = {
  ROW: 15,
  COL: 10
} as const;

export type row = typeof CODE.ROW;
export type col = typeof CODE.COL;

interface cardState {
  value: number | null,
  on:boolean
}

interface cardObjState{
  card: number | null,
  row: number,
  col: number
}

interface Context{
  level: [row,col],
  cardArr: cardObjState[],
  boardArr: null | cardState[][],
}
export const GameLevelContext = createContext<Context>({
  level: [15,10],
  cardArr: [],
  boardArr: null,
});

export const SET_LEVEL = "SET_LEVEL" as const;
export const SHUFFLE_BOARD = "SHUFFLE_BOARD" as const;
export const CLICK_CARD = "CLICK_CARD" as const;
export const MATCH_CARD = "MATCH_CARD" as const;
export const INIT_CARD = "INIT_CARD" as const;

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

interface SetLevelAction {
  type: typeof SET_LEVEL,
  level: [row,col]
}

export const setLevel = (level:[row,col]): SetLevelAction => {
  return { type: SET_LEVEL, level };
}

interface ShuffleBoardAction {
  type: typeof SHUFFLE_BOARD
}

export const shuffleBoardAction = (): ShuffleBoardAction => {
  return { type: SHUFFLE_BOARD };
}

interface ClickCardAction {
  type: typeof CLICK_CARD,
  cardObj: cardObjState
}
export const clickCard = (cardObj:cardObjState): ClickCardAction => {
  return { type: CLICK_CARD, cardObj };

}
interface MatchCardAction {
  type: typeof MATCH_CARD,
  card_1: cardObjState,
  card_2: cardObjState
}
export const matchCard = (card_1:cardObjState,card_2:cardObjState):MatchCardAction => {
  return { type: MATCH_CARD, card_1, card_2 };
}
interface InitCardAction {
  type: typeof INIT_CARD
}
export const initCard = ():InitCardAction => {
  return { type: INIT_CARD };
}

export type ReducerActions = SetLevelAction | ShuffleBoardAction | ClickCardAction | MatchCardAction | InitCardAction



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

const GameLevelContextProvider = ({ children }:{children:React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timeOff, setTimeOff] = useState(false);
  const { level, boardArr, cardArr } = state;

  const closeGame = useCallback(() => setTimeOff(true), []);
  const value = useMemo(
    () => ({
      boardArr,
      level,
      cardArr,
      timeOff,
      closeGame,
      dispatch,
    }),
    [boardArr, level, cardArr, timeOff]
  );

  return (
    <GameLevelContext.Provider value={value}>
      {children}
    </GameLevelContext.Provider>
  );
}

export default GameLevelContextProvider;

export function useGameLevelContext() {
  return useContext(GameLevelContext);
}
