import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const person = useContext(noteContext)
  return (
    <div>About {person.name} {person.age}</div>
  )
}

export default About