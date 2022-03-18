import React, {useState} from 'react';
import {TaskType} from "./App";
import {Button} from "./Button";

type AddTaskType = {
    tasks: Array<TaskType>
    addTask: (title: string) => void
}

export const AddTask = (props: AddTaskType) => {
    const [title, setTitle] = useState('')//локальный стэйт инпута
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')//очищаем строку после добавления таски
    }
    return (
      <div>
          <input value={title}
                 onChange={e => setTitle(e.currentTarget.value)}
                 onKeyPress={e => {
                     e.key === 'Enter' && addTaskHandler()
                 }}
          />
          {/*<button onClick={addTaskHandler}>+</button>*/}
          <Button name={'+'} callback={addTaskHandler}/>
      </div>
    );
};

