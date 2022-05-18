import React, {memo, useCallback} from 'react';
import './App.css';
import SearchAppBar from "./components/SearchAppBar";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/Store";
import {addTodoListAC, changeTodoListTitleAC, filterAC, removeTodoListAC} from "./reducers/todoListsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasksReducer";
import {Container, Grid, Paper} from "@mui/material";
import {AddItemForm} from "./components/AddItemForm";
import TodoList from "./components/TodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskObjectType = {
    [key: string]: TaskType[]
}

export type FilterValueType = 'all' | 'completed' | 'active'

const App = memo(() => {

    const todolists = useSelector<RootReducerType, TodolistsType[]>(
      state => state.todolists
    )
    const tasks = useSelector<RootReducerType, TaskObjectType>(
      state => state.tasks
    )
    const dispatch = useDispatch()

    const changeFilter = useCallback((tlId: string, filter: FilterValueType) => {
        dispatch(filterAC(tlId, filter))
    }, [dispatch])
    const removeTask = useCallback((tlId: string, id: string) => {
        dispatch(removeTaskAC(tlId, id))
    }, [dispatch])
    const removeTodoList = useCallback((tlId: string) => {
        dispatch(removeTodoListAC(tlId))
    }, [dispatch])
    const addTask = useCallback((tlId: string, title: string) => {
        console.log(12)
        dispatch(addTaskAC(tlId, title))
    }, [dispatch])
    const changeStatus = useCallback((tlId: string, id: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(tlId, id, newIsDone))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const changeTaskTitle = useCallback((tlId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(tlId, id, newTitle))
    }, [dispatch])
    const changeTodoListTitle = useCallback((tlId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(tlId, newTitle))
    }, [dispatch])
    return (
      <div className={'App'}>
          <SearchAppBar/>
          <Container fixed>
              <Grid container style={{padding: '20px'}}>
                  <AddItemForm title={'Add New TodoList'} addItem={addTodoList}/>
              </Grid>
              <Grid container spacing={5}>
                  {todolists.map(tl => {
                      return <Grid key = {tl.id} item>
                          <Paper elevation={6} style={{padding: '10px'}}>
                              <TodoList
                                key={tl.id}
                                tlId={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                tasks={tasks[tl.id]}
                                addTask={addTask}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                changeStatus={changeStatus}
                                removeTodoList={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                              />
                          </Paper>
                      </Grid>
                  })}
              </Grid>
          </Container>

      </div>
    )
})

export default App;

