import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS/ES6', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'React API', isDone: false},
    {id: 5, title: 'GraphQL', isDone: false},
  ])

  let removeTask = (id: number) => {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <div className={'App'}>
      <TodoList
        title={'what to learn'}
        tasks={tasks}
        removeTask={removeTask}
      />
    </div>
  )
}

export default App;

