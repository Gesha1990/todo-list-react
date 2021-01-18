import React, {Component} from "react";
import classNames from "classnames/bind";
//Style
import "./style.scss";
import trash from "../../assets/icons/trash.svg";
import { render } from "@testing-library/react";
interface TaskItem {
  id: number;
  taskValue: string;
  active: boolean;
  done: boolean;
}
interface TodoListComponentProps{
  searchInputValue: string,
  activeSearchBtn: string,
  taskItemArr: TaskItem[],
  addTaskItemToArr: Function
}
// React.FC<TodoListComponentProps> 
export  class  TodoListComponent extends Component<TodoListComponentProps>{
  
    // Function to filter tasks by mode and search word
    private _filteredArrByMode (arr: TaskItem[] = [],activeSearchBtn: string, searchInputValue: string ) {
     
    switch (activeSearchBtn) {
      case "done":
        return arr.filter((task: TaskItem) => task.done).filter((task: TaskItem) =>{
           return task.taskValue.toLowerCase().indexOf(searchInputValue.toLowerCase())!==-1
        });
      case "active":
        return arr.filter((task: TaskItem) => task.active).filter((task: TaskItem) =>{
          return task.taskValue.toLowerCase().indexOf(searchInputValue.toLowerCase())!==-1
       });;
      default:
        return arr.filter((task: TaskItem) =>{
          return task.taskValue.toLowerCase().indexOf(searchInputValue.toLowerCase())!==-1
       });;
    }
  };
 render() {
  const { searchInputValue, taskItemArr, addTaskItemToArr, activeSearchBtn} = this.props

    
 return (
    <div className="todo-list">
    {/* before we show a tasks we should filter depends on what mode is now  */}
    {this._filteredArrByMode(taskItemArr,activeSearchBtn, searchInputValue).map((taskItem) => {
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
}