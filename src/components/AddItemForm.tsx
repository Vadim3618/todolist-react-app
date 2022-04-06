import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState('')//локальный стэйт инпута
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") addItemHandler()
    }

    return (
      <div>
          <input value={title}
                 className={error ? 'error' : ''}//если эрор существует то активировать класс эрор
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
          />
          <Button name={'+'} callback={addItemHandler}/>
          {error && <div className={'error-message'}>{error}</div>}
      </div>
    );
};
