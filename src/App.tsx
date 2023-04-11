import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
function App() {

    const toDoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const [filter,setFilter]=useState<FilterValuesType>("all")
    const changeFilter =(nextFilter:FilterValuesType) => {
        setFilter(nextFilter)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        // console.log(tasks)
    }

    const addTask = (title:string) => {
        const newTask: TaskType = {
            id: v1 (),
            title:title,
            isDone:false
    }
    setTasks([newTask, ...tasks])
    }

    const getTasksForMe =(taskList:Array<TaskType>, filterValue:FilterValuesType)=>{
        switch (filterValue) {
            case "active":
                return tasks.filter(t=>!t.isDone)
            case "completed":
                return tasks.filter(t=>t.isDone)
            default:
                return tasks
        }
    }


    const taskForWhatIWantToSee = getTasksForMe(tasks,filter)

    return (
        <div className="App">
            <ToDoList
                      title={toDoListTitle}
                      tasks={taskForWhatIWantToSee}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />


        </div>

    );
}


export default App;
