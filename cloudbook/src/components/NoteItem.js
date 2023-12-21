import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote, handleEditClick} = context
  const { title, description, note, showAlert } = props;

  return (
    <>
      <div className="note-container">
        <div className="note">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        <div className="icons">
          <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id, showAlert)}}></i>
          <i className="fa-solid fa-pen-to-square" onClick={() => { handleEditClick(note) }}></i>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
