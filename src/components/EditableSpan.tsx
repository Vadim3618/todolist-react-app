import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
    fontWeight?: string
    fontSize?:string
    isDone?:boolean
}

export const EditableSpan = (props: EditableSpanType) => {
    const [title, setTitle] = useState('')

    const [editMode, setEditMode] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
      setTitle(e.currentTarget.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return (
      editMode
        ? <TextField value={title} autoFocus onBlur={activateViewMode}
                     onChange={onChangeHandler} label="Change"
                     variant="outlined" color={"info"}/>
        : <span
          style={props.isDone? {textDecoration:'line-through'} :{fontWeight:props.fontWeight, fontSize:props.fontSize}}
          onDoubleClick={activateEditMode}>{props.title}</span>
    );
};