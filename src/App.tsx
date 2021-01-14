import React, { useState } from "react";
import classNames from "classnames/bind";
import logo from "./logo.svg";
//Style
import "./App.scss";
import trash from "./assets/icons/trash.svg";

function App() {
  interface TaskItem {
    id: number;
    taskValue: string;
    active: boolean;
    done: boolean;
  }
  // Function to load tasks from local storage
  const loadArrFromLocalStorage = (): TaskItem[] => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) return [];
      return JSON.parse(serializedState);
    } catch (e) {
      console.log(e);
      return [];
    }
  };
 // Function to load mode from local storage
  const loadModeFromLocalStorage = (): string => {
    try {
      const serializedState = localStorage.getItem("mode");
      if (serializedState === null) return 'all';
      return serializedState;
    } catch (e) {
      console.log(e);
      return 'all';
    }
  };
  const [activeSearchBtn, setActiveSearchBtn] = useState<string>(loadModeFromLocalStorage());
  const [taskInputValue, setTaskInputValue] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [taskItemArr, addTaskItemToArr] = useState<Array<TaskItem>>(loadArrFromLocalStorage());

  // Function to filter tasks by mode and search word
  const filteredArrByMode = (arr: TaskItem[]) => {
    switch (activeSearchBtn) {
      case "done":
        return arr.filter((task: TaskItem) => task.done).filter((task: TaskItem) =>{
           return task.taskValue.indexOf(searchInputValue)!=-1
        });
      case "active":
        return arr.filter((task: TaskItem) => task.active).filter((task: TaskItem) =>{
          return task.taskValue.indexOf(searchInputValue)!=-1
       });;
      default:
        return arr.filter((task: TaskItem) =>{
          return task.taskValue.indexOf(searchInputValue)!=-1
       });;
    }
  };
  // Every state changing we save in localstorage
  const saveToLocalStorage = (taskItemArr: TaskItem[], mode: string): void => {
    try {
      const serializedState = JSON.stringify(taskItemArr);
      localStorage.setItem("state", serializedState);
      localStorage.setItem("mode", mode);
    } catch (e) {
      console.log(e);
    }
  };
  saveToLocalStorage(taskItemArr, activeSearchBtn);

  return (
    <div className="todo-list">
      <h1>Todo list</h1>
      <div className="search-bar">
        <input
          className="search-bar__input"
          placeholder="type to search"
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
        />
        <div className="search-bar__buttons">
          <div
            className={classNames({ active: activeSearchBtn === "all" })}
            onClick={() => {
              setActiveSearchBtn("all");
            }}
          >
            All
          </div>
          <div
            className={classNames({ active: activeSearchBtn === "active" })}
            onClick={(): void => {
              setActiveSearchBtn("active");
            }}
          >
            Active
          </div>
          <div
            className={classNames({ active: activeSearchBtn === "done" })}
            onClick={(): void => {
              setActiveSearchBtn("done");
            }}
          >
            Done
          </div>
        </div>
      </div>
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
                  const newTodos: TaskItem[] = taskItemArr.map((task) => {
                    if (task.id == taskItem.id) {
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
                        (task) => task.id !== taskItem.id
                      );
                      addTaskItemToArr(newTodos);
                    }}
                  />
                </div>
                <div
                  onClick={(): void => {
                    const newTodos: TaskItem[] = taskItemArr.map((task) => {
                      if (task.id == taskItem.id) {
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
            if(taskInputValue.trim() === ""){
              alert('Please write a task')
            } else{
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
    </div>
  );
}

export default App;
