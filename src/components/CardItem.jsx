import React, { memo } from "react";

const CardItem = memo(({ card, row, col, onClick, isMatch }) => {
  const onClickItem = () => {
    onClick({ card, row, col });
  };
  const cardClass = () => {
    if (card == null)
      return "w-12 h-16 bg-brand flex flex-col justify-center items-center";
    if (isMatch)
      return "w-12 h-16  bg-slate-50 flex flex-col justify-center items-center border-4 border-blue-800 shadow-indigo-500/40";
    if (!isMatch)
      return "w-12 h-16 bg-slate-50 flex flex-col justify-center items-center hover:border-4 hover:border-blue-400";
  };
  return (
    <div className={cardClass()} onClick={onClickItem}>
      {card != null && (
        <img
          src={process.env.PUBLIC_URL + `/assets/image/${card}.png`}
          alt="picture"
        />
      )}
    </div>
  );
});
export default CardItem;
