import React from "react";
import {FilterValuesType} from "./App";

type toDoListPropsType = {
    title: string
    tasks: TaskType []
    removeTask: (taskId: number) => void
    changeFilter: (nextFilter: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const ToDoList: React.FC<toDoListPropsType> = (props: toDoListPropsType) => {
    // const ToDoList = (props:ToDoListPropsType) => {

    const tasksListItems: Array<JSX.Element> = props.tasks.map((t: TaskType): JSX.Element => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>     
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>

        )
    })

    console.log();

    return (
        <div className="App">
            <div className="ToDoList">
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter("all")}>All</button>
                    <button onClick={() => props.changeFilter("active")}>Active</button>
                    <button onClick={() => props.changeFilter("completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
}
export default ToDoList;