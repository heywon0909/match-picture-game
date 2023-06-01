import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";

function getNumber() {
  let randomIndexArr = [];
  const [row, col] = sessionStorage.level?.split("*");
  while (randomIndexArr.length < (row * col) / 2) {
    let randomIndex = Math.floor(Math.random() * 30 + 1);
    if (randomIndexArr.indexOf(randomIndex) === -1) {
      randomIndexArr.push(randomIndex);
    }
  }

  return randomIndexArr;
}
function getRadomArr(numbers) {
  const [row, col] = sessionStorage.level?.split("*");

  let arr = Array.from({ length: col }, () => [0, 0, 0, 0]);
  let numbersDoubleArr = [];
  numbers.map((value) => {
    for (let i = 0; i < 2; i++) {
      numbersDoubleArr.push(value);
    }
  });

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      let randomArrIndex = Math.floor(Math.random() * numbersDoubleArr.length);
      arr[i][j] = numbersDoubleArr[randomArrIndex];

      numbersDoubleArr.splice(randomArrIndex, 1);
    }
  }
  console.log("arr", arr);
  return arr;
}
function getBoardCount() {
  const [row, col] = sessionStorage.level
    ? sessionStorage.level.split("*")
    : [4, 4];
  return row * col;
}
export default function Board() {
  const [boardArr, setBoardArr] = useState(() => getRadomArr(getNumber()));

  const [cardArr, setCardArr] = useState([]);
  const totalCount = useRef(0);
  totalCount.current = getBoardCount();

  const navigate = useNavigate();
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

    function GameMatchedCount() {
      let count = 0;
      for (let board of boardArr) {
        for (let card of board) {
          if (card == null) count++;
        }
      }
      if (count === totalCount.current) navigate("/game/win");
    }
    GameMatchedCount();
    return () => clearTimeout(timeout.current);
  }, [cardArr]);

  const onClick = (cardObj) => {
    // 1. matchArr의 길이가 2를 넘어가면 에러 던져주기
    // 2. matchArr 의 길이가 2가 되면 두 객체의 item 값 비교
    // 3. 맞으면 board 배열에서 제외

    setCardArr((prevCardArr) => {
      if (prevCardArr.length === 2) return [...prevCardArr];
      else return [...prevCardArr, cardObj];
    });
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
    </div>
  );
}
