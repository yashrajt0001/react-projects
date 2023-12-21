import { useState } from "react";
import noteContext from "./noteContext";
const host = 'http://localhost:5000'

const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const [note, setNote] = useState({ etitle: '', edescription: '' })
  const [noteValue, setNoteValue] = useState({})

  //get notes

  const getNotes = async() => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note

  const addNote = async (title, description, tag) => {
    await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
  };

  // delete a note

  const deleteNote = async (id, showAlert) => {
    //API call

    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    showAlert('Note deleted successfully', 'success')
  };

  // update a note

  const updateNote = async(id, title, description, showAlert) => {
    //API call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description })
      
    });

    let newNotes = JSON.parse(JSON.stringify(notes))
    //updating on client side
    const modal = document.querySelector(".modal-container");
    modal.classList.add("hide");
    for (let index = 0; index < notes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes)
    showAlert('Note updated successfully', 'success')
  };

  const handleEditClick = (note) => {
    const modal = document.querySelector(".modal-container");
    if (modal.classList.contains("hide")) {
      modal.classList.remove("hide");
    }
    setNote({ etitle: note.title, edescription: note.description });
    setNoteValue(note)
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        getNotes,
        addNote,
        deleteNote,
        updateNote,
        handleEditClick,
        onChange,
        note,
        setNote,
        noteValue
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
}

export default NoteState