import React from "react";

export default function CardItem({ card, row, col, onClick, isMatch }) {
  const onClickItem = () => {
    onClick({ card, row, col });
  };
  return (
    <div
      className={
        isMatch
          ? "w-28 h-32 bg-slate-50 flex flex-col justify-center items-center border-4 border-blue-400 shadow-indigo-500/40"
          : "w-28 h-32 bg-slate-50 flex flex-col justify-center items-center hover:border-4 hover:border-blue-400 "
      }
      onClick={onClickItem}
    >
      {card != null && (
        <img
          src={process.env.PUBLIC_URL + `/assets/image/${card}.png`}
          alt="picture"
        />
      )}
    </div>
  );
}
