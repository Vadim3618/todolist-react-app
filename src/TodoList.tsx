import React from 'react';
import {TaskType} from "./App";
import Button from "./Button";
import TodoListHeader from "./TodoListHeader";
import {TasksList} from "./TasksList";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
}

const TodoList = (props: TodoListPropsType) => {
  return (
    <div>
      <TodoListHeader title={props.title}/>
      <div>
        <input/>
        <button>+</button>
      </div>
      {/*<ul>*/}
        <TasksList tasks={props.tasks}/>
      {/*</ul>*/}
      <div>
        <Button title={'All'}/>
        <Button title={'Active'}/>
        <Button title={'Completed'}/>
      </div>
    </div>
  );
};

export default TodoList;

