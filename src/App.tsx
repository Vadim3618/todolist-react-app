import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type filterValueType = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS/ES6', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'React API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    const [filter, setFilter] = useState<filterValueType>('all')
    let tasksForTodoList = tasks;
    switch (filter) {
        case 'active':
            tasksForTodoList = tasks.filter(t => !t.isDone)
            break
        case 'completed':
            tasksForTodoList = tasks.filter(t => t.isDone)
            break
    }
    const changeFilter = (filter: filterValueType) => {
        setFilter(filter)
    }

    let removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,// = title: title
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    return (
      <div className={'App'}>
          <TodoList
            title={'what to learn'}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={changeFilter}
          />
      </div>
    )
}

export default App;

