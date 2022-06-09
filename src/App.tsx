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

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export type TodoListType = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type TodoListDomainType = TodoListType & { filter: FilterValueType }

export type TaskType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type TaskObjectType = {
    [key: string]: TaskType[]
}

export type FilterValueType = 'all' | 'completed' | 'active'

const App = () => {

    const todolists = useSelector<RootReducerType, TodoListDomainType[]>(
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
        dispatch(addTaskAC(tlId, title))
    }, [dispatch])
    const changeStatus = useCallback((tlId: string, id: string, newIsDone: TaskStatuses) => {
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
}

export default App;

