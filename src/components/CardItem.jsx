import React, { memo, useCallback, useMemo } from "react";
import {
  useGameLevelContext,
  CLICK_CARD,
  INIT_CARD,
} from "../context/GameLevelContext";

const CardItem = memo(({ card, row, col }) => {
  const { dispatch, cardArr, boardArr } = useGameLevelContext();

  const onClickItem = useCallback(() => {
    // 같은 카드 있으면 터치 안되게
    if (!card.value) return;

    let find = cardArr.find((item) => item.card === card.value);
    
    if (find) {
      return;
    }

    dispatch({
      type: CLICK_CARD,
      cardObj: { card: card.value, row, col },
    });
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

const RealTd = memo(({ cardClass, onClickItem, data }) => {
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
