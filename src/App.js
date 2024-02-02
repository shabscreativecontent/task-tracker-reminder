// import React from 'react'


// class App extends React.Component {
//   render(){
//     return <h1>Hello form React Class</h1>
//   }
// }


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";



function App() {
  // const name = 'Brad'
  // const x = true
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(()=>{
    const getTask = async () => {
      const setFetchTask = await fetchTasks()
      setTasks(setFetchTask)
    }

    getTask()
  }, [])


  // // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()

    return data;
  }


  // // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks${id}`)
    const data = await res.json()

    return data;
  }


  // // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1

    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()

    setTasks([...tasks, data])

    console.log("Added", task);
  }

  //  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => (task.id !== id)))

    console.log("delete", id);
  }

  // //  Toggle Reminder
  const toggleReminder = async (id) => {
    // setTasks(
    //   tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task )
    // )

    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = res.json()

    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task )
    )

    console.log('toggled', id);
  }


  return (
    <Router>
    <div className="container">
      {/* <h1>Hello {name} from React</h1> */}
      {/* <h2>hello {x ? "Yes" : "No"}</h2> */}

      <Header 
        title={"boy"} 
        onAddButton={() => setShowAddTask(!showAddTask)}
        showAddButton={showAddTask} 
      />
      
      <Routes>
      <Route path='/' element={
        <>
        {showAddTask && <AddTask onAdd={addTask} />}
        { tasks.length > 0 ? (
          <Tasks 
            tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleReminder} 
          />
        ) : (
          "No Tasks Add Tasks"
          ) 
        }
        </>
        }
      />

      <Route path='/about' element={ <About /> } />
      </Routes>

      <Footer />
    </div>
    </Router>
    
  );
}


export default App;
