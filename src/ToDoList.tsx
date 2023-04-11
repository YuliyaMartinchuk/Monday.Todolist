import React, {ChangeEvent, useRef, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

type toDoListPropsType = {
    title: string
    tasks: TaskType []
    removeTask: (taskId: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
    addTask: (title:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const ToDoList: React.FC<toDoListPropsType> = (props: toDoListPropsType) => {
    const [title,setTitle]=useState<string>("")

    console.log (title)

    // const ToDoList = (props:ToDoListPropsType) => {
    // const  taskTitleInput = useRef<HTMLInputElement>(null)
    // const setTitleHandler = () => {
    //     if (taskTitleInput.current) {
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ""
    //
    // }}

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = ()=>{
        props.addTask(title)
        setTitle("")
    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((t: TaskType): JSX.Element => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>     
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })
    const titleMaxLength = 25
    const isTitleLengthTooLong:boolean = title.length > titleMaxLength
    const isAddBtnDisabled:boolean = !title.length || isTitleLengthTooLong
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style = {{color:"red"}}>Title is too long</div>
        :null
    const handlerCreator =  (filter:FilterValuesType)  => () => props.changeFilter(filter)
    const addTaskOnKeyHandler = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler()

    return (
        <div className="App">
            <div className="ToDoList">
                <h3>{props.title}</h3>
                <div>
                    <input
                        placeholder="Please, enter title"
                        value={title}
                        onChange={setTitleHandler}
                        //ref={taskTitleInput}
                        onKeyDown={addTaskOnKeyHandler}
                        />
                    <button
                        disabled={isAddBtnDisabled}
                        // onClick= {setTitleHandler}
                        onClick={addTaskHandler}
                    >+</button>
                    {titleMaxLengthWarning}
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button onClick={handlerCreator("all")}>All</button>
                    <button onClick={handlerCreator("active")}>Active</button>
                    <button onClick={handlerCreator("completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
}
export default ToDoList;