import React from "react";
import classNames from "classnames/bind";
//Style
import "./style.scss";
import trash from "../../assets/icons/trash.svg";

function TodoListComponent(props: any) {
  interface TaskItem {
    id: number;
    taskValue: string;
    active: boolean;
    done: boolean;
  }
    const {searchInputValue, taskItemArr, addTaskItemToArr, activeSearchBtn} = props;
    // Function to filter tasks by mode and search word
  const filteredArrByMode = (arr: TaskItem[] = []) => {
    switch (activeSearchBtn) {
      case "done":
        return arr.filter((task: TaskItem) => task.done).filter((task: TaskItem) =>{
           return task.taskValue.indexOf(searchInputValue)!==-1
        });
      case "active":
        return arr.filter((task: TaskItem) => task.active).filter((task: TaskItem) =>{
          return task.taskValue.indexOf(searchInputValue)!==-1
       });;
      default:
        return arr.filter((task: TaskItem) =>{
          return task.taskValue.indexOf(searchInputValue)!==-1
       });;
    }
  };
  return (
    <div className="todo-list">
    {/* before we show a tasks we should filter depends on what mode is now  */}
    {filteredArrByMode(taskItemArr).map((taskItem) => {
      return (
        <div
          className={classNames("todo-list__item", {
            active: taskItem.active === true,
          })}
          key={taskItem.id}
        >
          <div
            className={classNames("todo-list__item-text", {
              done: taskItem.done === true,
            })}
            onClick={(): void => {
              const newTodos: TaskItem[] = taskItemArr.map((task:TaskItem ) => {
                if (task.id === taskItem.id) {
                  task.done = !task.done;
                  // if task done she automatically becomes no active
                  task.active = false;
                  return task;
                }
                return task;
              });
              addTaskItemToArr(newTodos);
            }}
          >
            {taskItem.taskValue}
          </div>
          <div className="todo-list__item-btn">
            <div>
              <img
                src={trash}
                alt="trash"
                onClick={(): void => {
                  const newTodos = taskItemArr.filter(
                    (task: TaskItem) => task.id !== taskItem.id
                  );
                  addTaskItemToArr(newTodos);
                }}
              />
            </div>
            <div
              onClick={(): void => {
                const newTodos: TaskItem[] = taskItemArr.map((task: TaskItem) => {
                  if (task.id === taskItem.id) {
                    task.active = !task.active;
                     // if task active she automatically becomes no done
                    task.done = false;
                    return task;
                  }
                  return task;
                });
                addTaskItemToArr(newTodos);
              }}
            >
              !
            </div>
          </div>
        </div>
      );
    })}
  </div>
  );
}

export default TodoListComponent;
