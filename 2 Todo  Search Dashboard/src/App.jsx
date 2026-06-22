import React, { useMemo, useState } from "react"

function AddTodo({ taskText,handleAddTask,handleTaskText }){
  return(
  <div>
        <h2>Add Todo</h2>

        <input
          type="text"
          value={taskText}
          onChange={handleTaskText}
          placeholder="Enter your task"
        />

        <button
          onClick={handleAddTask}>Add Task</button>
      </div>
  )
}

function SearchTodo({ searchText, handleSearchText }){

  return(
  <div>
        <h2>Search Todo</h2>

        <input
          type="text"
          placeholder="Enter task to search"
          value={searchText}
          onChange={handleSearchText}

        />

        
      </div>
  )
}

function TodoList({ filteredTasks, handleDeleteTask }){
  return(
    <div>
        <h2>Todo List</h2>

        
          <ul>{filteredTasks.map((task)=>(
          <li key={task.id}>{task.text}
            <button onClick={()=>handleDeleteTask(task.id)}>Delete task</button></li>
          
        ))}
        </ul>
        
      </div>
  )
}

const App = () => {

  const [taskText, setTaskText]=useState("")
  const [tasks, setTasks]=useState([])
  const [searchText, setSearchText]=useState("")

  function handleTaskText(event){
    setTaskText(event.target.value)
  }

  function handleSearchText(event){
    setSearchText(event.target.value)
  }

  const filteredTasks =useMemo(()=>{ 
    return tasks.filter((task)=>
    task.text.toLowerCase().includes(searchText.toLowerCase())
         )
    },[tasks,searchText])
    
  function handleAddTask(){
    if (taskText.trim() === "") {
      return
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: taskText.trim()
    }
    
    setTasks((previousTasks)=>[...previousTasks, newTask])
    setTaskText("")
  }

  function handleDeleteTask(id){
      setTasks((previousTasks)=>previousTasks.filter((task)=>task.id !==id))
    }

  return (
    <div>
      <h1>Todo & Search Dashboard</h1>

      <AddTodo
        taskText={taskText}
        handleAddTask={handleAddTask}
        handleTaskText={handleTaskText}
      />

      <SearchTodo
        searchText={searchText}
        handleSearchText={handleSearchText}
      />
      <TodoList
        filteredTasks={filteredTasks}
        handleDeleteTask={handleDeleteTask}
      />
      
    </div>
  )
}

export default App