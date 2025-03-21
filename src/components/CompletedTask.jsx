import { useOutletContext } from "react-router-dom";

const CompletedTasks=()=>{
    const { completedTasks } = useOutletContext(); // ✅ Get state from RootLayout
    
    return (
        <>
    <div className="container">
    <ul className="tasks">
     {completedTasks.length>0?completedTasks.map(task=><li className="task-item" key={task.id}>
            {task.todo}
        </li>):<span className="loader"> no completed tasks available</span>}
     </ul>
    </div>
        </>
    )
}
export default CompletedTasks;