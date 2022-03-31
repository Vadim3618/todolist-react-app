import React, {useState} from 'react';
import {TaskType} from "../App";
import {Button} from "./Button";

type AddTaskType = {
    tasks: Array<TaskType>
    tlId: string
    addTask: (tlId: string, title: string) => void
}

export const AddTask = (props: AddTaskType) => {
    const [title, setTitle] = useState('')//локальный стэйт инпута
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (title.trim() !== '') {//любое кол-во пробелов не является правильной строкой
            props.addTask(props.tlId, title.trim())//отсекаем пробелы
            setTitle('')//очищаем строку после добавления таски
        } else {
            setError('Title is required')//меняем error на это сообщение и перерисовываем компоненту
        }
    }
    return (
      <div>
          <input value={title}
                 className={error ? 'error' : ''}//если эрор существует то активировать класс эрор
                 onChange={e => setTitle(e.currentTarget.value)}
                 onKeyPress={e => {
                     setError(null)//каждый раз в ерор закидываем нал, тк нужно в случае ошибки при начале ввода убрать ошибку обнулить
                     e.key === 'Enter' && addTaskHandler()
                 }}
          />
          {/*<button onClick={addTaskHandler}>+</button>*/}
          <Button name={'+'} callback={addTaskHandler}/>
          {error && <div className={'error-message'}>{error}</div>}
      </div>
    );
};

