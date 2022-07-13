import React, { useState, useEffect } from "react"

// import components
import Header from "../Header/Header"
import Input from "../Input/Input"
import Filter from "../Filter/Filter"
import TaskList from "../TaskList/TaskList"

// import component styles ("S" stands for styled)
import { ThemeProvider } from "styled-components";
import * as theme from "../../config/theme"
import * as S from "./App.styled"

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks"); // get saved tasks from local storage
    return JSON.parse(saved) || []; // if saved tasks exist in local storage, set it. if not, set to an empty array.
  });
  const [status, setStatus] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleFilter = () => {
    // filter tasks by completion status
    let filtered;
    switch(status) {
      case 'Complete':
        filtered = tasks.filter(item => item.isComplete === true);
        break;
      case 'Incomplete':
        filtered = tasks.filter(item => item.isComplete === false);
        break;
      default:
        filtered = tasks;
        break;
    }
    // sort tasks by completion status
    // task list is rendered in reverse, so completed tasks come after incomplete tasks
    let sorted = filtered.sort((a, b) => {return b.isComplete - a.isComplete})
    setFilteredTasks(sorted);
  }

  // save tasks in local storage every time it updates
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // filter the tasks every time the tasks or status updates
  useEffect(() => {
    handleFilter();
  }, [tasks, status])

  return (
    <ThemeProvider theme={theme}>
    <S.App>
      <Header />
      <Input
        userInput={userInput}
        setUserInput={setUserInput}
        tasks={tasks}
        setTasks={setTasks}
      />
      <Filter
        status={status}
        setStatus={setStatus}
      />
      <TaskList 
        tasks={tasks}
        setTasks={setTasks}
        filteredTasks={filteredTasks}
        status={status}
      />
    </S.App>
    </ThemeProvider>
  )
}