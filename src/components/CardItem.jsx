import React, { memo, useCallback, useState } from "react";
import { CLICK_CARD } from "./Board";

const CardItem = memo(({ card, row, col, dispatch }) => {
  
  const [onFocus,setOnFocus] = useState(false);

 
  const onClickItem = useCallback(() => {
    console.log('card',card)
    if(!card) setOnFocus(false);
    if(card){
      setOnFocus(true);
      dispatch({type:CLICK_CARD,cardObj:{card, row, col }});
    }
   
  },[card]);
  const cardClass = () => {
    if (card == null)
      return "w-12 h-12 bg-brand";
    if (onFocus)
      return "w-12 h-12  bg-slate-50 border-4 border-blue-800 shadow-indigo-500/40";
    if (!onFocus)
      return "w-12 h-12 bg-slate-50  hover:border-4 hover:border-blue-400";
  };



  return (
    <td className={cardClass()} onClick={onClickItem}>
      {card != null && (
        <img
          src={process.env.PUBLIC_URL + `/assets/image/${card}.png`}
          alt="picture"
        />
      )}
    </td>
  );
});
export default CardItem;
