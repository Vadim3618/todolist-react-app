import React, {useState} from 'react';
import {filterValueType, TaskType} from "./App";
import {Button} from "./Button";
import TodoListHeader from "./TodoListHeader";
import {TasksList} from "./TasksList";
import {AddTask} from "./addTask";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: filterValueType) => void
}

const TodoList = (props: TodoListPropsType) => {

    const changeFilterHandler = (filter: filterValueType) => {
        props.changeFilter(filter)
    }

    return (
      <div>
          <TodoListHeader title={props.title}/>
          <AddTask tasks={props.tasks} addTask={props.addTask}/>
          <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
          <div>
              <Button name={'ALL'} callback={() => changeFilterHandler('all')}/>
              <Button name={'ACTIVE'} callback={() => changeFilterHandler('active')}/>
              <Button name={'COMPLETED'} callback={() => changeFilterHandler('completed')}/>
          </div>
      </div>
    );
};

export default TodoList;



