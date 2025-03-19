import "./App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import TaskManager from "./components/TaskManger";
import RootLayout from "./components/RootLayout";
import CompletedTasks from "./components/CompletedTask";
import NotFound from "./components/NotFound";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TaskManager /> }, 
      { path: "completed-tasks", element: <CompletedTasks /> },
      { path: "*", element: <NotFound /> }, 
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
