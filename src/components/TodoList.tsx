import React from 'react';
import {filterValueType, TaskType} from "../App";
import {Button} from "./Button";
import TodoListHeader from "./TodoListHeader";
import {TasksList} from "./TasksList";
import {AddTask} from "./addTask";

type TodoListPropsType = {
    title: string
    filter: filterValueType
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: filterValueType) => void
    changeStatus: (id: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {

    const changeFilterHandler = (filter: filterValueType) => {
        props.changeFilter(filter)
    }

    return (
      <div>
          <TodoListHeader title={props.title}/>
          <AddTask tasks={props.tasks} addTask={props.addTask}/>
          <TasksList tasks={props.tasks}
                     removeTask={props.removeTask}
                     changeStatus={props.changeStatus}/>
          <div>
              <Button className={props.filter === 'all' ? 'active-filter' : ''}
                      name={'All'}
                      callback={() => changeFilterHandler('all')}/>
              <Button className={props.filter === 'active' ? 'active-filter' : ''}
                      name={'Active'}
                      callback={() => changeFilterHandler('active')}/>
              <Button className={props.filter === 'completed' ? 'active-filter' : ''}
                      name={'Completed'}
                      callback={() => changeFilterHandler('completed')}/>
          </div>
      </div>
    );
};

export default TodoList;



