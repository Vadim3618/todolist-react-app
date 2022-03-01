import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  //BLL:
  const todoListTitle_1: string = 'what to learn'
  const todoListTitle_2: string = 'what to buy'
  const todoListTitle_3: string = 'what to read'

  const tasks_1: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS/ES6', isDone: true},
    {id: 3, title: 'React', isDone: false},
  ]
  const tasks_2: Array<TaskType> = [
    {id: 1, title: 'appartement', isDone: true},
    {id: 2, title: 'car', isDone: true},
    {id: 3, title: 'things', isDone: true},
  ]
  const tasks_3: Array<TaskType> = [
    {id: 1, title: 'книга 1', isDone: true},
    {id: 2, title: 'книга 2', isDone: false},
    {id: 3, title: 'книга 3', isDone: false},
  ]

  //UI:
  return (
    <div className={'App'}>
      <TodoList title={todoListTitle_1} tasks={tasks_1}/>
      <TodoList title={todoListTitle_2} tasks={tasks_2}/>
      <TodoList title={todoListTitle_3} tasks={tasks_3}/>
    </div>
  )
}

export default App;

