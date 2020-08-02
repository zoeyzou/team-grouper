import React, { useState } from 'react'
import { randomizeArray } from 'utils/randomizeArray'
import { groupArray } from 'utils/groupArray'

function App() {
  const [studentInput, setStudentInput] = useState<string>('')
  const [mentorInput, setMentorInput] = useState<string>('')
  const [studentList, setStudentList] = useState<string[]>([])
  const [mentorList, setMentorList] = useState<string[]>([])
  const [groups, setGroups] = useState<string[][]>([])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'student') {
      setStudentInput(e.target.value)
    } else {
      setMentorInput(e.target.value)
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const field = e.currentTarget.name

    if (field === 'student') {
      let studentNames: string[] = []
      if (studentInput.includes(',')) {
        studentNames = studentInput.split(',').map((item) => item.trim())
      } else {
        studentNames = [studentInput]
      }
      setStudentList([...studentList, ...studentNames])
      setStudentInput('')
    } else {
      let mentorNames: string[] = []
      if (mentorInput.includes(',')) {
        mentorNames = mentorInput.split(',').map((item) => item.trim())
      } else {
        mentorNames = [mentorInput]
      }
      setMentorList([...mentorList, ...mentorNames])
      setMentorInput('')
    }
  }

  const generate = () => {
    const generatedGroups = groupArray(randomizeArray(studentList), randomizeArray(mentorList))
    setGroups(generatedGroups)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={submitHandler} name="student">
        <h1>List of students</h1>
        <input type="text" value={studentInput} onChange={changeHandler} name="student" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {studentList.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <form onSubmit={submitHandler} name="mentor">
        <h1>List of mentors</h1>
        <input type="text" value={mentorInput} onChange={changeHandler} name="mentor" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {mentorList.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <button type="button" onClick={generate}>
        Generate groups
      </button>
      <ol>
        {groups.map((group) => (
          <li
            key={Math.random()}
            style={{ border: '1px solid orange', margin: '20px', padding: '20px' }}
          >
            <ul>
              {group.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default App
