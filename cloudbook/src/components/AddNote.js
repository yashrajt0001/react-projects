import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";


const AddNote = () => {
    const [note, setNote] = useState({title:'', description:'', tag:''})
    const context = useContext(noteContext)
    const {addNote, getNotes} = context
    
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        getNotes()
        setNote({ title: "", description: "", tag: "" });
   };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <form className="main-container">
      <div className="add-note-container">
        <h1 className="heading">Add a note</h1>
        <div className="note-form">
          <div className="title-field">
            <h2>Title</h2>
            <input type="text" onChange={onChange} value={note.title} id="title" name="title" autoFocus/>
          </div>
          <div className="desc-field">
            <h2>Description</h2>
            <input type="text" onChange={onChange} id="description" value={note.description} name="description" />
          </div>
          <button className="add-btn" type="submit" disabled={note.title<1} onClick={handleClick}>
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNote;
