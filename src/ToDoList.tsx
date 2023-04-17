import React, {ChangeEvent, useRef, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

type toDoListPropsType = {
    title: string
    tasks: TaskType []
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const ToDoList: React.FC<toDoListPropsType> = (props: toDoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, SetError] = useState<boolean>(false)

    console.log(title)

    // const ToDoList = (props:ToDoListPropsType) => {
    // const  taskTitleInput = useRef<HTMLInputElement>(null)
    // const setTitleHandler = () => {
    //     if (taskTitleInput.current) {
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ""
    //
    // }}

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && SetError(false)
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            SetError(true)
        }

        setTitle("")
    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((t: TaskType): JSX.Element => {

        const removeTask = () => props.removeTask(t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        const taskClasses = t.isDone ? "task-isDone" : "task"


        return (
            <li>
                <div>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeTaskStatus}/>
                    <span className={taskClasses}>{t.title}</span>
                </div>
                <button onClick={() => removeTask}>x</button>
            </li>
        )
    })
    const titleMaxLength = 25
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long</div>
        : null

    const userMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : null

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const addTaskOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler()
    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined

    return (
        <div className="App">
            <div className="ToDoList">
                <h2>{props.title}</h2>
                <div>
                    <input
                        placeholder="Please, enter title"
                        value={title}
                        onChange={setTitleHandler}
                        //ref={taskTitleInput}
                        onKeyDown={addTaskOnKeyHandler}
                        className={inputClasses}
                    />
                    <button
                        disabled={isAddBtnDisabled}
                        // onClick= {setTitleHandler}
                        onClick={addTaskHandler}
                    >+
                    </button>
                    {titleMaxLengthWarning || userMessage}
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div className={"filter-btn-wrapper"}>

                    <button
                        className={props.filter === "all"
                            ? "filter-btn filter-btn-active"
                            : "filter-btn"}
                        onClick={handlerCreator("all")}>All
                    </button>
                    <button
                        className={props.filter === "active"
                            ? "filter-btn filter-btn-active"
                            : "filter-btn"}
                        onClick={handlerCreator("active")}>Active
                    </button>
                    <button
                        className={props.filter === "completed"
                            ? "filter-btn filter-btn-active"
                            : "filter-btn"}
                        onClick={handlerCreator("completed")}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ToDoList;