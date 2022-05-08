import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
// import {Button} from "./Button";

type AddItemFormType = {
    addItem: (title: string) => void
    title: string
}

export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState('')//локальный стэйт инпута
    const [error, setError] = useState<boolean>(false)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === "Enter") addItemHandler()
    }

    return (
      <div>
          <TextField value={title} className={error ? 'error' : ''} color={"info"}
                     onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                     label={error ? "Title is required" : props.title}
                     variant="outlined" size={"small"} error={error}/>

          <Button onClick={addItemHandler} variant={"contained"}
                  color={"info"} size={"small"}
                  style={{width: '45px', height: '45px'}}
          >+</Button>
          {/*{error && <div className={'error-message'}>{error}</div>}*/}
      </div>
    );
};
