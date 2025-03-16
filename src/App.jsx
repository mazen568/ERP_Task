import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TaskManager from './components/TaskManger';
import RootLayout from './components/RootLayout';
import CompletedTasks from './components/CompletedTask';
import { useState } from 'react';

function App() {

  const [completedTasks,setCompletedTasks]=useState([]);




  const router =createBrowserRouter([
   {
    path:"/" ,
    element:<RootLayout/>,
    children:[
      {path:"/" , element:<TaskManager setCompletedTasks={setCompletedTasks} />},
      {path:"/completed-tasks" , element:<CompletedTasks completedTasks={completedTasks}/>},
    ]
   }
  ])
 

  return (
    <>
     <RouterProvider router={router}/>
    </>
  );

}

export default App
