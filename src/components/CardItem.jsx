import React, { memo, useCallback, useEffect, useState } from "react";
import { useGameLevelContext,CLICK_CARD } from '../context/GameLevelContext';

const CardItem = memo(({ card, row, col }) => {
  const { dispatch } = useGameLevelContext();
  
  const onClickItem = useCallback(() => {
    if(card){
      dispatch({type:CLICK_CARD,cardObj:{card:card.value, row, col }});
    }
   
   
  },[card]);
  const cardClass = () => {
    
    if (card.value == null)
      return "w-12 h-12 bg-brand";
    if (card.on)
      return "w-12 h-12  bg-slate-50 border-4 border-blue-800 shadow-indigo-500/40";
    if (!card.on)
      return "w-12 h-12 bg-slate-50  hover:border-4 hover:border-blue-400";
  };



  return (
    <td className={cardClass()} onClick={onClickItem}>
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
