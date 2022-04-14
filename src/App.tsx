import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import SearchAppBar from "./components/SearchAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'all' | 'completed' | 'active'

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskObjectType = {
    [key: string]: TaskType[]
}

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ])

    let [tasks, setTasks] = useState<TaskObjectType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "apartment", isDone: true},
            {id: v1(), title: "car", isDone: true},
            {id: v1(), title: "yacht", isDone: false},
            {id: v1(), title: "airplane", isDone: false},
        ]
    })

    const changeFilter = (tlId: string, value: FilterValueType) => {
        setTodolists(todolists
          .map(tl => tl.id === tlId ? {...tl, filter: value} : tl))
    }

    let removeTask = (tlId: string, id: string) => {
        setTasks({
            ...tasks, [tlId]: tasks[tlId]
              .filter(t => t.id !== id)
        })
    }

    const addTask = (tlId: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [tlId]: [newTask, ...tasks[tlId]]})
    }

    const changeStatus = (tlId: string, id: string, newIsDone: boolean) => {
        setTasks({
            ...tasks, [tlId]: tasks[tlId]//tlID - todoListID1 or todoListID2
              .map(t => t.id === id ? {...t, isDone: newIsDone} : t)
        })
    }

    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        let newTodoList: TodolistsType = {id: newTodoListId, title, filter: 'all'}
        setTodolists([newTodoList, ...todolists])
        setTasks({[newTodoListId]: [], ...tasks})
    }

    const changeTaskTitle = (tlId: string, id: string, newTitle: string) => {
        setTasks({
            ...tasks, [tlId]: tasks[tlId]
              .map(t => t.id === id ? {...t, title: newTitle} : t)
        })
    }

    const changeTodoListTitle = (tlId: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === tlId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
      <div className={'App'}>
          <SearchAppBar/>

          <Container fixed>
              <Grid container style={{padding:'20px'}}>
                  <AddItemForm addItem={addTodoList}/>
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
                          <Paper  elevation={6} style={{padding:'10px'}}>
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

