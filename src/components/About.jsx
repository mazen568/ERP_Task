import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "./About.css"; // Import the CSS file

const About = () => {
    const { id } = useParams();  // Get the task ID from the URL params
    const [task, setTask] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTaskById = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://dummyjson.com/todos/${id}`); 
                setTask(response.data); // Set the fetched task
            } catch (error) {
                console.error("Failed to fetch task:", error);
                setError("Failed to fetch task details.");
            } 
                setIsLoading(false);
        };

        if (id) {
            fetchTaskById(); 
        }
    }, [id]);

    if (error) return <p className="error-message">{error}</p>;
    if (isLoading) return <p className="loading-message">Loading task details...</p>;
    if (!task) return <p className="no-task-message">No task found.</p>;

    return (
        <div className="container">
            <h2 className="task-heading">Task Details</h2>
            <div className="task-card">
                <p className="task-detail"><strong>ID:</strong> {task.id}</p>
                <p className="task-detail"><strong>Task:</strong> {task.todo}</p>
                <p className="task-detail">
                    <strong>Status:</strong> 
                    <span className={task.completed ? "status-completed" : "status-pending"}>
                        {task.completed ? "Completed ✅" : "Not Completed ❌"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default About;