import React from 'react';
// import {filterValueType} from "./App";

type ButtonType ={
    name:string
    callback:()=>void
}

export const Button = (props:ButtonType) => {
    const onClickHandler = ()=>{
        props.callback()
    }
    return (
      <button onClick={onClickHandler}>{props.name}</button>
    );
};




