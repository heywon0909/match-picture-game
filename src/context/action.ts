export const SET_LEVEL = "SET_LEVEL" as const;
export const SHUFFLE_BOARD = "SHUFFLE_BOARD" as const;
export const CLICK_CARD = "CLICK_CARD" as const;
export const MATCH_CARD = "MATCH_CARD" as const;
export const INIT_CARD = "INIT_CARD" as const;

export const CODE = {
  ROW: 15,
  COL: 10
} as const;

export type row = typeof CODE.ROW;
export type col = typeof CODE.COL;


export interface cardState {
  value: number | null,
  on:boolean
}

export interface cardObjState{
  card: number | null,
  row: number,
  col: number
}


interface SetLevelAction {
  type: typeof SET_LEVEL,
  level: [row,col]
}



interface ShuffleBoardAction {
  type: typeof SHUFFLE_BOARD
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
export const setLevel = (level:[row,col]): SetLevelAction => {
  return { type: SET_LEVEL, level };
}

export const shuffleBoardAction = (): ShuffleBoardAction => {
  return { type: SHUFFLE_BOARD };
}