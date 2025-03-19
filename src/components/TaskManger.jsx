import { useState, useEffect } from "react";
import axios from "axios"
import { useOutletContext } from "react-router-dom";

const TaskManager = () => {


    const { setCompletedTasks } = useOutletContext(); // ✅ Get state from RootLayout



    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        id: "",
        todo: "",
        completed: null
    })
    //third task completed attribute is true from the api

    const [error, setError] = useState("")
    const [isFetchingTasks, setIsFetchingTasks] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    const handleInputChange = (event) => {
        setNewTask(
            {
                id: Math.random(),
                todo: event.target.value,
                completed: false
            }
        );
    }

    const handleAddTasks = () => {
        setTasks(prevTasks =>
            [
                ...prevTasks,
                newTask
            ]
        );

        setNewTask({
            id: "",
            todo: "",
            completed: null
        });
    }

    const handleEditTask = (task) => {
        setEditingTaskId(task.id);
        setEditedTask(task.todo)
    }
    const handleDeleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
    }

    const handleSaveTask = () => {
        setTasks(prevTasks => prevTasks.map(task => task.id === editingTaskId ? { ...task, todo: editedTask } : task)
        );
        setEditingTaskId(null)
    }

    const handleCompleteTask = (task) => {
        const updatedTask = { ...task, completed: !task.completed }; 

        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.id === task.id ? updatedTask : t
            )
        );

       
    };

    useEffect(() => {
        const fetchTasks = async () => {
            setIsFetchingTasks(true)
            try {
                const response = await axios.get('https://dummyjson.com/todos?limit=5&skip=10')
                console.log(response.data.todos);
                console.log(response);
                
                setTasks(response.data.todos)
              
            } catch (error) {
                console.log(error);
                setError(error.response.data.message || "Failed to fetch tasks")
            }
            setIsFetchingTasks(false)

        }
        fetchTasks();
    }, [])

    useEffect(() => {
        setCompletedTasks(tasks.filter(task => task.completed));
    }, [tasks,setCompletedTasks]); 
    

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>
    }
    return (<>
        <div className="container">
            <h2 className="title">Task Manager</h2>
            <div className="input-container">
                <input
                    className="task-input"
                    value={newTask.todo}
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                />
                <button className="button" onClick={handleAddTasks} disabled={!newTask.todo}>
                    Add Task
                </button>
            </div>

            {isFetchingTasks ? <span className='loader'>loading tasks....</span > : tasks && tasks.length > 0 ? (
                <ul className="tasks">
                    {tasks.map((task) => (
                        editingTaskId === task.id ?
                            <div className="editing-container">
                                <input
                                    className="edit-input"
                                    onChange={(event) => { setEditedTask(event.target.value) }}
                                    key={task.id}
                                    type="text"
                                    value={editedTask}
                                />
                                <div className="button-group">
                                    <button className="save-btn" onClick={() => handleSaveTask()}>Save</button>
                                    <button className="cancel-btn" onClick={() => setEditingTaskId(null)}>Cancel</button>
                                </div>
                            </div>
                            : (<li key={task.id} className="task-item">
                                <span>{task.todo}</span>
                                <div className="button-group">
                                    <button className="edit-btn" onClick={() => handleEditTask(task)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                    <input
                                        type="checkbox"
                                        checked={task.completed || false}
                                        onChange={() => handleCompleteTask(task)}
                                    />
                                </div>
                            </li>)
                    ))}
                </ul>
            ):<span className="loader">no tasks available</span>}
        </div></>)
}
export default TaskManager;