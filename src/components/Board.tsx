import * as React from 'react';
import  {
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
import { cardState, initCard, matchCard, shuffleBoardAction } from '../context/action';

const Board = () => {
  const { boardArr, level, cardArr, dispatch } = useGameLevelContext();

  let boardCount = useRef<number>();
  const [row, col] = level;
  boardCount.current = row * col;
  console.log('boardArr',boardArr,boardArr?.length)

  const navigate = useNavigate();
  const timeout = useRef<number>();
  const checkArr = useRef<number[][]>();
  checkArr.current = Array.from({ length: boardCount.current / 15 }, () =>
    Array.from({ length: 15 }, () => 0)
  );
  const audioContainer = useRef<HTMLAudioElement>(null);
  const audioWrongContainer = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    
    if (cardArr.length === 2) {
      const cardList = cardArr.sort((a, b) => a.row - b.row);
      const [card_1, card_2] = cardList;

      let answer = false;
      const isSameValue = card_1.card === card_2.card;
      if (!isSameValue) answer = false;
      if (isSameValue) {
        // 같은 행일때, 열이 0 또는 14일때
        console.log(card_1,card_2,boardArr?.length)
        if (
          card_1.row === card_2.row &&
          card_2.col !== card_1.col &&
          (card_1.row === 0 || card_1.row === (boardArr as cardState[][]).length - 1)
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
              if (!boardArr) return;
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
            let lastRow = startRow === card_1.row + 1 ? card_2.row : card_1.row;
            while (startRow < lastRow) {
              if (!boardArr) return;
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

        // 0번째 행/ 마지막 행으로 갔을때까지 null 값이면 참
        if (!answer) {
          let diff = Math.abs(0-(card_1.row)) > Math.abs(((boardArr as cardState[][]).length -1) - card_1.row)
          if (diff) {
            let card1_row = card_1.row === (boardArr as cardState[][]).length - 1 ? card_1.row : card_1.row + 1;
            let card2_row = card_2.row === (boardArr as cardState[][]).length - 1 ? card_2.row : card_2.row + 1;
            while (card1_row < (boardArr as cardState[][]).length - 1) {
              if (!boardArr) return;
              if (boardArr[card1_row][card_1.col].value != null) {
                break;
              }
              card1_row++;
            }
            while (card2_row < (boardArr as cardState[][]).length - 1) {
              if (!boardArr) return;
              if (boardArr[card2_row][card_2.col].value != null) {
                break;
              }
              card2_row++;
            }
      
            if (card1_row === (boardArr as cardState[][]).length - 1 && card2_row === (boardArr as cardState[][]).length - 1) {
              console.log('맞았습니다.');
              answer = true;
            }
            
          } else {
            console.log('여기타니')
             let card1_row = card_1.row === 0 ? card_1.row : card_1.row - 1;
             let card2_row = card_2.row === 0 ? card_2.row : card_2.row - 1;
            
            while (card1_row > 0) {
              if (!boardArr) return;
              if (boardArr[card1_row][card_1.col].value != null) {
                break;
              }
              card1_row--;
            }
            while (card2_row > 0) {
              if (!boardArr) return;
              if (boardArr[card2_row][card_2.col].value != null) {
                break;
              }
              card2_row--;
            }
            console.log('card_col',card1_row,card2_row)
            if (card1_row === 0 && card2_row === 0) {
              console.log('맞았습니다.');
              answer = true;
            }
          }
        }


        // 0번째 열, 마지막 열까지 갔을때 null 이면 참
        if (!answer) {
          let diff = Math.abs(0-(card_1.col)) > Math.abs((14) - card_1.col)
          if (diff) {
            console.log('여기')
            let card1_col = card_1.col === 14 ? card_1.col : card_1.col + 1;
            let card2_col = card_2.col === 14 ? card_2.col : card_2.col + 1;
            while (card1_col < 14) {
              if (!boardArr) return;
              if (boardArr[card_1.row][card1_col].value != null) {
                break;
              }
              card1_col++;
            }
            while (card2_col < 14) {
              if (!boardArr) return;
              if (boardArr[card_2.row][card2_col].value != null) {
                break;
              }
              card2_col++;
            }
            
            console.log('card',card1_col,card2_col)
            if (card1_col === 14 && card2_col === 14) {
              console.log('맞았습니다.');
              answer = true;
            }
            
          } else {
             let card1_col = card_1.col === 0 ? card_1.col : card_1.col - 1;
             let card2_col = card_2.col === 0 ? card_2.col : card_2.col - 1;
            
            while (card1_col > 0) {
              if (!boardArr) return;
              if (boardArr[card_1.row][card1_col] != null) {
                break;
              }
              card1_col--;
            }
            while (card2_col > 0) {
              if (!boardArr) return;
              if (boardArr[card_2.row][card2_col] != null) {
                break;
              }
              card2_col--;
            }
            console.log('card_col',card1_col,card2_col)
            if (card1_col === 0 && card2_col === 0) {
              console.log('맞았습니다.');
              answer = true;
            }
          }
        }

        if (!answer) {
         
          const solution = () => {
            let value = false;
            const start_row = card_1.row;
            const end_row = card_2.row;
            const start_col = Math.min(card_1.col, card_2.col);
            const end_col = Math.max(card_1.col, card_2.col);
            console.log("cardList", cardList);
            console.log("start", start_col, end_col);

            const updatedCheckArr = [...checkArr.current as number[][]]; // 새로운 배열 생성
            // updatedCheckArr.forEach((value, row) => {
            //   updatedCheckArr[row].forEach((data, col) => {
            //     if (boardArr[row][col].value == null || (card_1.col === col && card_1.row === row) || (card_2.col === col && card_2.row === row)) {
            //       updatedCheckArr[row][col] = 1;
            //     }
              
            //   })
            // })
            const checkAround = (row: number, col:number) => {
              updatedCheckArr[row][col] = 1;
              let around = [[row, col - 1], [row, col], [row, col + 1]];
              if (!boardArr) return;
              if (boardArr[row - 1]) {
                around = around.concat([
                  [row - 1,col - 1],
                  [row - 1,col],
                  [row-1,col+1]
                ])
              }

              if (boardArr[row + 1]) {
                around = around.concat([
                  [row + 1,col - 1],
                  [row + 1,col],
                  [row + 1,col + 1]                
                ])
              }
              console.log('around', around);
              const arr = around.filter((v) => boardArr[v[0]][v[1]]?.value == null && updatedCheckArr[v[0]][v[1]] === 0);
              console.log('arr', arr);
              arr.forEach(item => {
                updatedCheckArr[item[0]][item[1]] = 1;
                console.log('checkArr',updatedCheckArr)
                checkAround(item[0], item[1]);
              })
                            
            }
            checkAround(card_1.row, card_1.col);
            checkAround(card_2.row,card_2.col);
  
            checkArr.current = updatedCheckArr; // 업데이트된 배열 할당
            console.log("check", checkArr.current);
            let curve_line = 0;
            let dx = [-1, 0, 1, 0];
            let dy = [0, 1, 0, -1];
       
            const dfs = (x:number, y:number, curve:number | null,prev_curve:number | null) => {
              console.log('재귀', curve_line,x,y)
              if (value) return;
              if (curve_line > 4) {
                value = false;
                return;
              }
              if (x === card_2.row && y === card_2.col) {
                console.log("맞았습니다.123",curve_line);
                value = true;
                return;
              } else {
                for (let k = 0; k < 4; k++) {
                  let nx = x + dx[k];
                  let ny = y + dy[k];
                  if (!checkArr.current) return;
                  if (nx >= 0 && nx <= checkArr.current.length - 1 && ny >= 0 && ny <= checkArr.current[0].length - 1  && checkArr.current[nx][ny] === 1 ) {
                    checkArr.current[nx][ny] = 0;
                    if (curve !== k) {
                      curve_line++;
                    }
                    dfs(nx, ny, k, curve);
                    if (value) {
                      return;
                    }
                    if (k !== curve) {
                    curve_line--;
                    }
                    checkArr.current[nx][ny] = 1;
                  }
                }
              }
            }

          
            dfs(card_1.row, card_1.col, null,null);
          
            return value;
          }
          answer=solution();
          
        }
      }
     
      if (answer === true) {
        audioContainer.current?.play()
        dispatch(matchCard(card_1,card_2));
      } else {
        audioWrongContainer.current?.play()
        console.log("틀렸습니다.");
      }
      
      timeout.current = window.setTimeout(() => {
        dispatch(initCard());
      }, 200);
    }
    function GameMatchedCount() {
      let count = 0;
      for (let board of (boardArr as cardState[][])) {
        for (let card of board) {
          if (card == null) count++;
        }
      }
      if (count === boardCount.current) navigate("/game/win");
    }
    GameMatchedCount();
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [cardArr]);

  const onShuffle = useCallback(() => {
    dispatch(shuffleBoardAction());
  }, []);

  return (
    <div className="block">
      <audio id="audioContainer" ref={audioContainer}>
        <source id="audioSource" src={process.env.PUBLIC_URL+"/assets/audio/Pling Sound.mp3"} />
      </audio>
      <audio id="audioWrongContainer" ref={audioWrongContainer}>
        <source id="audioSource" src={process.env.PUBLIC_URL+"/assets/audio/Mario Jumping Sound.mp3"} />
      </audio>
      <div
        onClick={onShuffle}
        className="mt-2 p-2 w-20 h-6 text-sm rounded-md bg-purple-800 text-white flex justify-center items-center relative left-0"
      >
        shuffle
      </div>
      <table className="flex items-center justify-center w-full border-separate border-spacing-2">
        <tbody className="h-table">
          {Array(boardArr.length)
            .fill(null)
            .map((val, row) => (
              <BoardTr
                key={row}
                row={row}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Board;
