import React, { memo, useCallback, useMemo } from "react";
import {
  useGameLevelContext,
  CLICK_CARD,
  INIT_CARD,
} from "../context/GameLevelContext";

const CardItem = memo(({ card, row, col }) => {
  const { dispatch, cardArr } = useGameLevelContext();

  const onClickItem = useCallback(() => {
    // 같은 카드 있으면 터치 안되게
    let find = cardArr.find(
      (item) =>
        item.value === card.value && item.row === row && item.col === col
    );
    if (find) {
      return;
    }
    if (card) {
      dispatch({ type: CLICK_CARD, cardObj: { card: card.value, row, col } });
    }
  }, [card]);
  const cardClass = useMemo(() => {
    if (card.value == null) return "w-12 h-12 bg-brand";
    if (card.on)
      return "w-12 h-12  bg-slate-50 border-4 border-blue-800 shadow-indigo-500/40";
    if (!card.on)
      return "w-12 h-12 bg-slate-50  hover:border-4 hover:border-blue-400";
  }, [card]);

  return <RealTd cardClass={cardClass} onClickItem={onClickItem} card={card} />;
});

const RealTd = memo(({ cardClass, onClickItem, card }) => {
  return (
    <td className={cardClass} onClick={onClickItem}>
      {card.value != null && (
        <img
          src={process.env.PUBLIC_URL + `/assets/image/${card.value}.png`}
          alt="picture"
        />
      )}
    </td>
  );
});

export default CardItem;
