import React,{useState} from 'react';

function getNumber(){
    let randomIndexArr = [];
    while (randomIndexArr.length < 8) {
    let randomIndex = Math.floor(Math.random() * 30 + 1);
        if (randomIndexArr.indexOf(randomIndex) === -1) {
            randomIndexArr.push(randomIndex);
        }
    }
        
    return randomIndexArr;
}
export default function Board() {
    const [boadArr, setBoardArr] = useState(getNumber);
    console.log('board',boadArr)
    return (
        <div className='w-full grid grid-rows-4 grid-flow-col gap-1 place-content-center'>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
        <div className='w-28 h-32 bg-slate-50'></div>
      </div>
    );
}

