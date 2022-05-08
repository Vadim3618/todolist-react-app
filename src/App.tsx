import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import SearchAppBar from "./components/SearchAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./state/Store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasksReducer";
import {addTodoListAC, changeTodoListTitleAC, filterAC, removeTodoListAC} from "./reducers/todoListsReducer";

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

function App() {
    const todolists = useSelector<RootReducerType, TodolistsType[]>(
      state => state.todolists
    )
    const tasks = useSelector<RootReducerType, TaskObjectType>(
      state => state.tasks
    )
    const dispatch = useDispatch()

    const changeFilter = (tlId: string, filter: FilterValueType) => {
        dispatch(filterAC(tlId, filter))
    }
    const removeTask = (tlId: string, id: string) => {
        dispatch(removeTaskAC(tlId, id))
    }
    const removeTodoList = (tlId: string) => {
        dispatch(removeTodoListAC(tlId))
    }
    const addTask = (tlId: string, title: string) => {
        dispatch(addTaskAC(tlId, title))
    }
    const changeStatus = (tlId: string, id: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(tlId, id, newIsDone))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }
    const changeTaskTitle = (tlId: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(tlId, id, newTitle))
    }
    const changeTodoListTitle = (tlId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(tlId, newTitle))
    }

    return (
      <div className={'App'}>
          <SearchAppBar/>
          <Container fixed>
              <Grid container style={{padding: '20px'}}>
                  <AddItemForm title={'Add New TodoList'} addItem={addTodoList}/>
              </Grid>
              <Grid container spacing={5}>
                  {todolists.map(tl => {
                      let tasksForTodoList = tasks[tl.id];//todoListID1 or todoListID2
                      switch (tl.filter) {
                          case 'active':
                              tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                              break
                          case 'completed':
                              tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                              break
                      }

                      return <Grid item>
                          <Paper elevation={6} style={{padding: '10px'}}>
                              <TodoList
                                key={tl.id}
                                tlId={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                tasks={tasksForTodoList}
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
}

export default App;

