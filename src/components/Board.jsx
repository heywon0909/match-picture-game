import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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

  const [cardArr, setCardArr] = useState([]);
  const [result, setResult] = useState("짝을 맞춰주세요");
  const timeout = useRef(null);

  const onCheckCardMatching = () => {
    if (cardArr.length === 2) {
      const [card_1, card_2] = cardArr;
      if (card_1.card === card_2.card) {
        console.log("맞았습니다.");
        setBoardArr((prevArr) => {
          const newBoardArr = [...prevArr];
          newBoardArr[card_1.row][card_1.col] = null;
          newBoardArr[card_2.row][card_2.col] = null;
          return newBoardArr;
        });
      } else {
        console.log("틀렸습니다.");
      }
      timeout.current = setTimeout(() => {
        setCardArr([]);
      }, 500);
    }
  };

  useEffect(() => {
    onCheckCardMatching();
    return () => clearTimeout(timeout.current);
  }, [cardArr]);

  const onClick = (cardObj) => {
    // 1. matchArr의 길이가 2를 넘어가면 에러 던져주기
    // 2. matchArr 의 길이가 2가 되면 두 객체의 item 값 비교
    // 3. 맞으면 board 배열에서 제외

    if (cardArr.length === 2) return;
    setCardArr((prevCardArr) => [...prevCardArr, cardObj]);
  };
  const isMatchCard = (card, row, col) => {
    return Object.values(cardArr).filter(
      (obj) => obj.card === card && obj.row === row && obj.col === col
    )?.length > 0
      ? true
      : false;
  };
  return (
    <div className="w-full p-2 grid grid-rows-4 grid-flow-col md:gap-2 gap-4 place-content-center">
      {boardArr &&
        boardArr.map((board, row) => {
          return board.map((card, col) => {
            return (
              <CardItem
                key={`카드번호${card}배열${row}${col}`}
                card={card}
                onClick={onClick}
                row={row}
                col={col}
                isMatch={isMatchCard(card, row, col) === true ? true : false}
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
