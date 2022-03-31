import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

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

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
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
            ...tasks, [tlId]: tasks[tlId]
              .map(t => t.id === id ? {...t, isDone: newIsDone} : t)
        })
    }

    return (
      <div className={'App'}>
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
              return (
                <TodoList
                  key={tl.id}
                  tlId={tl.id}
                  title={tl.title}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeFilter={changeFilter}
                  changeStatus={changeStatus}
                  filter={tl.filter}
                />
              )
          })}
      </div>
    )
}

export default App;

