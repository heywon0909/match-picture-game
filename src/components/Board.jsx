import React, { useState } from "react";
import CardItem from "./CardItem";

function getNumber() {
  let randomIndexArr = [];
  while (randomIndexArr.length < 8) {
    let randomIndex = Math.floor(Math.random() * 30 + 1);
    if (randomIndexArr.indexOf(randomIndex) === -1) {
      randomIndexArr.push(randomIndex);
    }
  }

  return randomIndexArr;
}
function getRadomArr(numbers) {
  let arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  let numbersDoubleArr = [];
  numbers.map((value) => {
    for (let i = 0; i < 2; i++) {
      numbersDoubleArr.push(value);
    }
  });

  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < arr.length; j++) {
      let randomArrIndex = Math.floor(Math.random() * numbersDoubleArr.length);
      arr[i][j] = numbersDoubleArr[randomArrIndex];

      numbersDoubleArr.splice(randomArrIndex, 1);
    }
  }
  return arr;
}
export default function Board() {
  const [boardArr, setBoardArr] = useState(() => getRadomArr(getNumber()));
  console.log("board", boardArr);
  const [matchArr, setMatchArr] = useState([]);
  const onClick = (itemObj) => {
    setMatchArr((prevArr) => [...prevArr, itemObj]);
  };
  const isMatchItem = (item, row, col) => {
    return Object.values(matchArr).filter(
      (obj) => obj.item === item && obj.row === row && obj.col === col
    )?.length > 0
      ? true
      : false;
    return false;
  };
  return (
    <div className="w-full grid grid-rows-4 grid-flow-col gap-1 place-content-center">
      {boardArr &&
        boardArr.map((board, row) => {
          return board.map((item, col) => {
            console.log("isMatchItem", isMatchItem(item, row, col));
            return (
              <CardItem
                key={`카드번호${item}배열${row}${col}`}
                item={item}
                onClick={onClick}
                row={row}
                col={col}
                isMatch={isMatchItem(item, row, col) === true ? true : false}
              />
            );
          });
        })}
      {/* <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div>
      <div className="w-28 h-32 bg-slate-50"></div> */}
    </div>
  );
}
