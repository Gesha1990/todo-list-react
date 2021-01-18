import React, { useState } from "react";
import classNames from "classnames/bind";
//Components
import SearchComponent from "./Component/SearchComponent/index";
import {TodoListComponent} from "./Component/TodoListComponent/index";
import AddTaskControllerComponent from "./Component/AddTaskControllerComponent/index";
//Style
import "./App.scss";

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
      if (serializedState === null) return "all";
      return serializedState;
    } catch (e) {
      console.log(e);
      return "all";
    }
  };
  const [activeSearchBtn, setActiveSearchBtn] = useState<string>(
    loadModeFromLocalStorage()
  );
  const [taskInputValue, setTaskInputValue] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [taskItemArr, addTaskItemToArr] = useState<Array<TaskItem>>(
    loadArrFromLocalStorage()
  );

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
      <SearchComponent
        setSearchInputValue={setSearchInputValue}
        setActiveSearchBtn={setActiveSearchBtn}
        activeSearchBtn={activeSearchBtn}
      />
      <TodoListComponent
        searchInputValue={searchInputValue}
        taskItemArr={taskItemArr}
        addTaskItemToArr={addTaskItemToArr}
        activeSearchBtn={activeSearchBtn}
      />
      <AddTaskControllerComponent
        taskInputValue={taskInputValue}
        setTaskInputValue={setTaskInputValue}
        taskItemArr={taskItemArr}
        addTaskItemToArr={addTaskItemToArr}
      />
    </div>
  );
}

export default App;
