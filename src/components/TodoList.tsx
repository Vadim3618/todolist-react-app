import React, {memo, useCallback} from 'react';
import {FilterValueType, TaskType} from "../App";
import TodoListHeader from "./TodoListHeader";
import {TasksList} from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import {Button, ButtonGroup} from "@mui/material";

type TodoListPropsType = {
    tlId: string
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    removeTask: (tlId: string, id: string) => void
    addTask: (tlId: string, title: string) => void
    removeTodoList: (tlId: string) => void
    changeFilter: (tlId: string, filter: FilterValueType) => void
    changeStatus: (tlId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (tlId: string, id: string, newValue: string) => void
    changeTodoListTitle: (tlId: string, newValue: string) => void
}

const TodoList = memo((props: TodoListPropsType) => {
    console.log('TodoList')
    const changeFilterHandler = useCallback((filter: FilterValueType) => {
        props.changeFilter(props.tlId, filter)
    }, [props.changeFilter, props.tlId])

    const addTask = useCallback((title: string) => {
        props.addTask(props.tlId, title)
    }, [props.addTask, props.tlId])

    const onClickRemoveHandler = useCallback((tlId: string) => {
        props.removeTodoList(tlId)
    }, [props.removeTodoList])

    let tasksForTodoList = props.tasks//todoListID1 or todoListID2
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    return (
      <div>
          <TodoListHeader changeTodoListTitle={props.changeTodoListTitle}
                          tlId={props.tlId} title={props.title}
                          callback={() => onClickRemoveHandler(props.tlId)}
          />
          <AddItemForm title={'Add New Task'} addItem={addTask}/>
          <TasksList tasks={props.tasks}
                     tasksForTodoList={tasksForTodoList}
                     removeTask={props.removeTask}
                     changeStatus={props.changeStatus}
                     tlId={props.tlId}
                     changeTaskTitle={props.changeTaskTitle}
          />
          <div>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button style={{width: '100px'}} color={"info"}
                          variant={props.filter === 'all' ? 'text' : 'contained'}
                          onClick={() => changeFilterHandler('all')}>All</Button>
                  <Button style={{width: '100px'}} color={"info"}
                          variant={props.filter === 'active' ? 'text' : 'contained'}
                          onClick={() => changeFilterHandler('active')}>Active</Button>
                  <Button style={{width: '100px'}} color={"info"}
                          variant={props.filter === 'completed' ? 'text' : 'contained'}
                          onClick={() => changeFilterHandler('completed')}>Finished</Button>
              </ButtonGroup>
          </div>
      </div>
    );
})

export default TodoList;





