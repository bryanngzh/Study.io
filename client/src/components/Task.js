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
    }

    const toggleTask = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/task/toggle", {
            _id: event.data._id, completed: event.data.completed,
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
                      <input type={"checkbox"} onClick={() => toggleTask(task)} checked={task.completed}/>
                      {task.text}
                  </li>
              ))}
          </ul>
        </div>
    )
    
}

export default Task