import React from "react"
import * as S from "./Filter.styled"

export default function Filter({status, setStatus}) {
  const handleChange = (e) => {
    setStatus(e.target.value);
  }

  return (
    <S.Filter status={status}>
      <button className="complete-btn" onClick={handleChange} value="Complete">Complete</button>
      <button className="incomplete-btn" onClick={handleChange} value="Incomplete">Incomplete</button>
      <button className="all-btn" onClick={handleChange} value="All">All</button>
    </S.Filter>
  )
}