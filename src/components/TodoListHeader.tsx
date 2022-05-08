import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

type TodoListHeaderPropsType = {
    tlId: string
    title: string
    callback: () => void
    changeTodoListTitle: (tlId: string, newValue: string) => void
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {

    const onChangeTodoTitle = (newValue: string) => {
        props.changeTodoListTitle(props.tlId, newValue)
    }

    return (
      <>

          <EditableSpan fontWeight={'700'} fontSize={'26px'}
            title={props.title} onChange={onChangeTodoTitle}/>

          <IconButton>
              <Delete fontSize={"small"}
                      onClick={props.callback}/>
          </IconButton>
      </>
    );
};

export default TodoListHeader;



