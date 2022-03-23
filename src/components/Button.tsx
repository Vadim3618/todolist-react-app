import React from 'react';

type ButtonType = {
    name: string
    callback: () => void
    className?: string
}

export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callback()
    }
    return (
      <button className={props.className ? props.className : ''} onClick={onClickHandler}>{props.name}</button>
    );
};




