import React, { memo, useCallback, useMemo } from "react";
import {useGameLevelContext} from "../context/GameLevelContext";
import { cardState, clickCard } from '../context/action';

interface CardProps {
  card: cardState
  row: number;
  col: number;
}

interface RealTdProps {
  cardClass?: string;
  onClickItem: () => void;
  data: number | null;
}

const CardItem = memo(({ card, row, col }: CardProps) => {
  const { dispatch, cardArr, boardArr } = useGameLevelContext();

  const onClickItem = useCallback(() => {
    // 같은 카드 있으면 터치 안되게
    if (!card.value) return;

    let find = cardArr.find((item) => item.card === card.value);
    
    if (find) {
      return;
    }

    dispatch(clickCard({ card: card.value, row, col }));
  }, [card]);
  const cardClass = useMemo(() => {
    if (card.value == null) return "w-12 h-12 bg-brand";
    if (card.on)
      return "w-12 h-12  bg-slate-50 border-4 border-blue-800 shadow-indigo-500/40";
    if (!card.on)
      return "w-12 h-12 bg-slate-50  hover:border-4 hover:border-blue-400";
  }, [card]);

  //console.log("td rendered");
  return (
    <RealTd cardClass={cardClass} onClickItem={onClickItem} data={card.value} />
  );
});



const RealTd = memo(({ cardClass, onClickItem, data }: RealTdProps) => {
  //console.log("real td rendered");
  return (
    <td className={cardClass} onClick={onClickItem}>
      {data != null && (
        <img
          src={process.env.PUBLIC_URL + `/assets/image/${data}.png`}
          alt="picture"
        />
      )}
    </td>
  );
});

export default CardItem;
