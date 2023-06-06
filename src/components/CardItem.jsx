import React, { memo, useCallback, useEffect, useState } from "react";
import { CLICK_CARD } from "./Board";

const CardItem = memo(({ card, row, col,dispatch }) => {
  // const [onFocus,setOnFocus] = useState(false);
  
  const onClickItem = useCallback(() => {
    console.log('card',card)
    
    if(card){
      dispatch({type:CLICK_CARD,cardObj:{card:card.value, row, col }});
    }
   
   
  },[card]);
  const cardClass = () => {
    console.log('여기',card)
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
