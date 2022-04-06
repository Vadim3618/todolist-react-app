import React from 'react';
import {EditableSpan} from "./EditableSpan";

type TodoListHeaderPropsType = {
    tlId: string
    title: string
    changeTodoListTitle: (tlId: string, newValue: string) => void
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const onChangeTodoTitle = (newValue: string) => {
        props.changeTodoListTitle(props.tlId, newValue)
    }

    return (
      <h3>
          <EditableSpan title={props.title} onChange={onChangeTodoTitle}/>
      </h3>
    );
};

export default TodoListHeader;
