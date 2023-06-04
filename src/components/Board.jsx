import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";
import { useGameLevelContext } from '../context/GameLevelContext';


function getNumber() {
  let randomIndexArr = Array.from({length:30},(v,i)=>i+1);  
  return randomIndexArr;
}
function getRadomArr(numbers) {
  const [row, col] = sessionStorage.level?.split("*");

  let arr = Array.from({ length: col }, () => Array.from({length:row},()=>0));
  let numbersDoubleArr = [];
  const len = (row * col) / 30;
  numbers.map((value) => {
    
    for (let i = 0; i < len; i++) {
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

const Board = () => {
  const [boardArr, setBoardArr] = useState(() => getRadomArr(getNumber()));
  console.log('bard',boardArr.length)

  const [cardArr, setCardArr] = useState([]);
  const totalCount = useRef(0);
  totalCount.current = getBoardCount();

  const navigate = useNavigate();
  const timeout = useRef(null);
  const { level } = useGameLevelContext();
  

 

  useEffect(() => {
    if (cardArr.length === 2) {
      const [card_1, card_2] = cardArr;
      console.log('cardArr',cardArr)
      let answer = false;
      if (card_1.card === card_2.card && (card_1.row !== card_2.row || card_1.col !== card_2.col)) {
        // 같은 행일때
        if((card_1.row === card_2.row) && (card_2.col !== card_1.col) && (card_1.row === 0 || card_1.row === boardArr.length-1)){
          console.log('맞았습니다.');
          answer = true;
        }

        // 같은 열일때
        if((card_1.row === card_2.row) && Math.abs(card_2.col - card_1.col) ===1){
          console.log('맞았습니다.')
          answer = true;
        }

        if((card_1.col === card_2.col) && Math.abs(card_2.row - card_1.row) ===1){
          console.log('맞았습니다.')
          answer = true;
        }
        console.log('(card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === boardArr.length-1) && (card_1.row !== card_2.row)',(card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === boardArr.length-1) && (card_1.row !== card_2.row))
        if((card_1.col=== card_2.col) && (card_1.col === 0 || card_1.col === 14) && (card_1.row !== card_2.row)){
          console.log('맞았습니다.')
          answer = true;
        }   
        
        
        if(answer){
          setBoardArr((prevArr) => {
            const newBoardArr = [...prevArr];
            newBoardArr[card_1.row][card_1.col] = null;
            newBoardArr[card_2.row][card_2.col] = null;
            return newBoardArr;
          });
        }else{
          console.log("틀렸습니다.");
        }
        
      } else {
        console.log("틀렸습니다.");
      }
      timeout.current = setTimeout(() => {
        setCardArr([]);
      }, 500);
    }
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

  const onClick = useCallback((cardObj) => {
    // 1. matchArr의 길이가 2를 넘어가면 에러 던져주기
    // 2. matchArr 의 길이가 2가 되면 두 객체의 item 값 비교
    // 3. 맞으면 board 배열에서 제외

    setCardArr((prevCardArr) => {
      if (prevCardArr.length === 2) return [...prevCardArr];
      else return [...prevCardArr, cardObj];
    });
  },[]);
  const isMatchCard = (card, row, col) => {
    return Object.values(cardArr).filter(
      (obj) => obj.card === card && obj.row === row && obj.col === col
    )?.length > 0
      ? true
      : false;
  };


  return (
    <table className="flex items-center justify-center w-full border-separate border-spacing-2">
      <tbody>
      {
        boardArr && Array(boardArr.length).fill().map((val,row)=>{
          return <tr key={'비밀'+row}>
          { boardArr[row].map((card,col)=>{
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
          })
          }
          </tr>
        })
      }
      </tbody>
    </table>
  );
};
export default Board;


