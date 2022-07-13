import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { v4 as uuidv4 } from 'uuid'
import * as S from "./Input.styled"

export default function Input({userInput, setUserInput, tasks, setTasks}) {
  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default behavior of refreshing the page
    if (userInput === "") return null; // if userInput is empty, don't make a new task
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        text: userInput,
        isComplete: false
      }
    ])
    setUserInput("");
  }

  return (
      <S.Input>
        <input
          type="text"
          className="input-text"
          onChange={handleChange}
          value={userInput}
        />
        <button
          type="submit"
          className="input-btn"
          onClick={handleSubmit}
        >
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </S.Input>
  )
}