import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  useRef,
  useReducer,
} from "react";

import { useNavigate } from "react-router-dom";
import { useGameLevelContext } from "../context/GameLevelContext";
import BoardTr from "./BoardTr";
import {
  MATCH_CARD,
  INIT_CARD,
  SHUFFLE_BOARD,
} from "../context/GameLevelContext";

const Board = () => {
  const { boardArr, level, cardArr, dispatch } = useGameLevelContext();

  let boardCount = useRef(null);
  const [row, col] = level;
  boardCount.current = row * col;

  const navigate = useNavigate();
  const timeout = useRef(null);
  const checkArr = useRef([]);
  checkArr.current = Array.from({ length: boardCount.current / 15 }, () =>
    Array.from({ length: 15 }, () => 0)
  );

  useEffect(() => {
    console.log("카드", cardArr);
    if (cardArr.length === 2) {
      const cardList = cardArr.sort((a, b) => a.row - b.row);
      const [card_1, card_2] = cardList;

      let answer = false;
      const isSameValue = card_1.card === card_2.card;
      if (!isSameValue) answer = false;
      if (isSameValue) {
        // 같은 행일때, 열이 0 또는 14일때
        if (
          card_1.row === card_2.row &&
          card_2.col !== card_1.col &&
          (card_1.row === 0 || card_1.row === boardArr.length - 1)
        ) {
          console.log("맞았습니다.");
          answer = true;
        }

        // 같은 열일때, 행이 0 또는 14일때
        if (
          !answer &&
          card_1.col === card_2.col &&
          (card_1.col === 0 || card_1.col === 14) &&
          card_1.row !== card_2.row
        ) {
          console.log("맞았습니다.");
          answer = true;
        }

        // 같은 행, 열의 절댓값 차가 1일때
        if (!answer && card_1.row === card_2.row) {
          const diff = Math.abs(card_2.col - card_1.col);

          if (diff === 1) {
            answer = true;
          } else if (diff > 1) {
            let startCol =
              card_2.col > card_1.col ? card_1.col + 1 : card_2.col + 1;
            let lastCol = startCol === card_1.col + 1 ? card_2.col : card_1.col;

            while (startCol < lastCol) {
              if (boardArr[card_1.row][startCol].value == null) {
                startCol++;
              } else {
                answer = false;
                break;
              }
            }
            if (startCol === lastCol) {
              console.log("맞았습니다.");
              answer = true;
            }
          }
        }

        // 같은 열, 다른 행인데, 행의 절댓값 차가 1 이상 일때
        if (!answer && card_1.col === card_2.col) {
          const diff = Math.abs(card_2.row - card_1.row);
          if (diff === 1) {
            console.log("맞았습니다.");
            answer = true;
          } else if (diff > 1) {
            let startRow = card_1.row + 1;
            let lastRow = card_1.row;
            while (startRow < lastRow) {
              if (boardArr[startRow][card_1.col].value === null) {
                startRow++;
              } else {
                answer = false;
                break;
              }
            }
            if (startRow === lastRow) {
              console.log("맞았습니다.");
              answer = true;
            }
          }
        }

        if (!answer) {
          const start_row = card_1.row;
          const end_row = card_2.row;
          const start_col = Math.min(card_1.col, card_2.col);
          const end_col = Math.max(card_1.col, card_2.col);
          console.log("cardList", cardList);
          console.log("start", start_col, end_col);

          const updatedCheckArr = [...checkArr.current]; // 새로운 배열 생성

          for (let i = start_row; i <= end_row; i++) {
            const newRow = [...updatedCheckArr[i]]; // 새로운 행 생성
            for (let j = start_col; j <= end_col; j++) {
              if (
                boardArr[i][j].value == null ||
                (card_1.row === i && card_1.col === j) ||
                (card_2.row === i && card_2.col === j)
              ) {
                newRow[j] = 1; // 요소 수정
              }
            }
            updatedCheckArr[i] = newRow; // 수정된 행을 새로운 배열에 할당
          }

          checkArr.current = updatedCheckArr; // 업데이트된 배열 할당
          console.log("check", checkArr.current);

          let dx = [-1, 0, 1, 0];
          let dy = [0, 1, 0, -1];
          const dfs = (x, y) => {
            if (x === card_2.row && y === card_2.col) {
              console.log("맞았습니다.");
              answer = true;
            } else {
              for (let k = 0; k < 4; k++) {
                let nx = x + dx[k];
                let ny = y + dy[k];

                if (checkArr.current[nx][ny] === 1) {
                  checkArr.current[nx][ny] = 0;

                  dfs(nx, ny);
                  checkArr.current[nx][ny] = 1;
                }
              }
            }
          };

          dfs(card_1.row, card_1.col);
        }
      }

      if (answer) {
        dispatch({ type: MATCH_CARD, card_1, card_2 });
      } else {
        console.log("틀렸습니다.");
      }

      timeout.current = setTimeout(() => {
        dispatch({ type: INIT_CARD });
      }, 200);
    }
    function GameMatchedCount() {
      let count = 0;
      for (let board of boardArr) {
        for (let card of board) {
          if (card == null) count++;
        }
      }
      if (count === boardCount) navigate("/game/win");
    }
    GameMatchedCount();
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [cardArr]);

  const onShuffle = useCallback(() => {
    dispatch({ type: SHUFFLE_BOARD });
  }, []);

  return (
    <div className="block">
      <div
        onClick={onShuffle}
        className="mt-2 p-2 w-20 h-6 text-sm rounded-md bg-purple-800 text-white flex justify-center items-center relative left-0"
      >
        shuffle
      </div>
      <table className="flex items-center justify-center w-full border-separate border-spacing-2">
        <tbody className="h-table">
          {Array(boardArr.length)
            .fill()
            .map((val, row) => (
              <BoardTr
                key={row}
                boardData={boardArr[row]}
                row={row}
                dispatch={dispatch}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Board;
