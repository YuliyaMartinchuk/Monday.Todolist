import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

export type FilterValuesType = "all" | "active" | "completed"
function App() {
    const toDoListTitle: string = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])

    const [filter,setFilter]=useState<FilterValuesType>("all")
    const changeFilter =(nextFilter:FilterValuesType) => {
        setFilter(nextFilter)
    }
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        // console.log(tasks)
    }

    const getTasksForMe =(taskList:Array<TaskType>, filterValue:FilterValuesType)=>{
        switch (filterValue) {
            case "active":
                return tasks.filter(t=>t.isDone === false)
            case "completed":
                return tasks.filter(t=>t.isDone === true)
            default:
                return tasks
        }
    }


    const taskForWhatIWantToSee = getTasksForMe(tasks,filter)

    return (
        <div className="App">
            <ToDoList title={toDoListTitle}
                      tasks={taskForWhatIWantToSee}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />


        </div>

    );
}


export default App;
