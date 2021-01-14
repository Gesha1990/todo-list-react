import React from "react";
//Style
import "./style.scss";
interface TaskItem {
    id: number;
    taskValue: string;
    active: boolean;
    done: boolean;
  }
interface AddTaskController{
    taskInputValue: string,
    setTaskInputValue: ()=>{},
    taskItemArr: TaskItem[],
    addTaskItemToArr: ()=>{}
}
const AddTaskControllerComponent: React.FC<any> = (props: any) => {
  
    const {taskInputValue, setTaskInputValue, taskItemArr, addTaskItemToArr} = props;

  return (
    <div className="add-task">
        <input
          placeholder="What needs to be done"
          value={taskInputValue}
          onChange={(e): void => {
            setTaskInputValue(e.target.value);
          }}
        />
        <div
          onClick={(): void => {
            if (taskInputValue.trim() === "") {
              alert("Please write a task");
            } else {
              const newTodos = [
                ...taskItemArr,
                {
                  id: new Date().getUTCMilliseconds(),
                  taskValue: taskInputValue,
                  active: false,
                  done: false,
                },
              ];
              addTaskItemToArr(newTodos);
              setTaskInputValue("");
            }
          }}
        >
          Add Item
        </div>
      </div>
  );
}

export default AddTaskControllerComponent;
