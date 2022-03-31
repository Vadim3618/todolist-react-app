import React from 'react';
import {FilterValueType, TaskType} from "../App";
import {Button} from "./Button";
import TodoListHeader from "./TodoListHeader";
import {TasksList} from "./TasksList";
import {AddTask} from "./addTask";

type TodoListPropsType = {
    tlId: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTask: (tlId: string, id: string) => void
    addTask: (tlId: string, title: string) => void
    changeFilter: (tlId: string, filter: FilterValueType) => void
    changeStatus: (tlId: string, id: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {

    const changeFilterHandler = (filter: FilterValueType) => {
        props.changeFilter(props.tlId, filter)
    }

    return (
      <div>
          <TodoListHeader title={props.title}/>
          <AddTask tasks={props.tasks} tlId={props.tlId} addTask={props.addTask}/>
          <TasksList tasks={props.tasks}
                     removeTask={props.removeTask}
                     changeStatus={props.changeStatus}
                     tlId={props.tlId}
          />
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



