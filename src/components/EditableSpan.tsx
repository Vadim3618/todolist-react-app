import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
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
        ? <input onChange={onChangeHandler}
                 onBlur={activateViewMode}
                 value={title} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};