import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
  } from "react";
  
  import { useNavigate } from "react-router-dom";
  import { useGameLevelContext } from '../context/GameLevelContext';
  import BoardTr from "./BoardTr";
  
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
  
  export default function Board() {
    
  
    return (
      <table className="flex items-center justify-center w-full border-separate border-spacing-2">
      <tbody>
      { Array(boardArr.length).fill().map((val,row)=><BoardTr key={row} boardData={boardArr[row]} row={row} dispatch={dispatch}/>)}
      </tbody>
    </table>
    );
  }
  
  
  