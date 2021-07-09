import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (id: string, todolistId: string) => void
    addTask: (value: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, value: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, title: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
}

export function Todolist(props: TodolistPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }


    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter( props.id, 'completed')


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                            const onClickHandler = () => props.removeTask(t.id, props.id)
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsDoneValue = e.currentTarget.checked
                                props.changeStatus(t.id, newIsDoneValue, props.id)
                            }
                            const onChangeTitleHandler = (value: string) => {
                                props.changeTaskTitle(t.id, value, props.id)
                            }
                            return (
                                <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <Checkbox color='primary' onChange={onChangeStatusHandler} checked={t.isDone}/>
                                    <EditableSpan title={t.title}
                                                  onChange={onChangeTitleHandler}/>
                                    <IconButton onClick={onClickHandler}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            )
                        }
                    )}
            </div>
            <div>
                <Button
                    color={props.filter === 'all' ? 'primary' : 'default'}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    size='small'>All</Button>
                <Button
                    color={props.filter === 'active' ? 'primary' : 'default'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    size='small'>Active</Button>
                <Button
                    color={props.filter === 'completed' ? 'primary' : 'default'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                    size='small'>Completed</Button>
            </div>
        </div>
    )
}

