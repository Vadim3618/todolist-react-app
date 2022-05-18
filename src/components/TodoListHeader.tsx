import React, {memo, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

type TodoListHeaderPropsType = {
    tlId: string
    title: string
    callback: () => void
    changeTodoListTitle: (tlId: string, newValue: string) => void
}

const TodoListHeader = memo((props: TodoListHeaderPropsType) => {

    const onChangeTodoTitle = useCallback((newValue: string) => {
        props.changeTodoListTitle(props.tlId, newValue)
    }, [props.changeTodoListTitle, props.tlId])

    return (
      <>

          <EditableSpan fontWeight={'700'} fontSize={'26px'}
                        title={props.title} onChange={onChangeTodoTitle}/>

          <IconButton onClick={props.callback}>
              <Delete fontSize={"small"}/>
          </IconButton>
      </>
    );
})

export default TodoListHeader;



