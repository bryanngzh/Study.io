import { useState, useEffect } from "react"
import axios from "axios"

const Task = () => {

    const [inputVal, setInputVal] = useState("")
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios.get("http://localhost:3001/task", {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setTasks(response.data)
            }
        })
        }
    }, [tasks])

    const addTask = (event) => {
        event.preventDefault()
        if (inputVal.length > 0) {
            axios.post("http://localhost:3001/task/addTask", {
            text: inputVal, completed: false,
            }, {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    setTasks([...tasks, response.data])
                    setInputVal("")
                }
            })
        } else {
            alert("Please add a task!")
        }
    }

    const toggleTask = (event) => {
        axios.post("http://localhost:3001/task/toggle", {
            _id: event._id, completed: !event.completed,
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                const newTasks = tasks.map(task => {
                    if (task._id === event._id) {
                        task.completed = !event.completed
                    }
                    return task
                })
                setTasks([...newTasks])
            }
        })
    }

    const deleteTask = (event) => {
        axios.post("http://localhost:3001/task/deleteTask", {
            _id: event._id, 
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                setTasks([...tasks])
            }
        })
    }

    return (
        <div>
            <form className="form" onSubmit={addTask}>
                <div className="form-group">
                <input 
                    value={inputVal}
                    type="text"
                    placeholder="Add Task..." 
                    onChange={e => setInputVal(e.target.value)}
                />
                </div>
                <input type="submit"  value="Add" />
          </form>
          <ul>
              {tasks.map(task => (
                  <li>
                      <input type={"checkbox"}  onClick={() => toggleTask(task)} checked={task.completed}/>
                      {task.completed ? <del>{task.text}</del> : task.text}
                      <input type="button" value="Delete" onClick={() => deleteTask(task)}/>
                  </li>
              ))}
          </ul>
        </div>
    )
    
}

export default Task