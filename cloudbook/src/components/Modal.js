import './cssModal.css'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Modal = (props) => {
    const context = useContext(noteContext)
    const {onChange, note, updateNote, noteValue} = context
    
    const cancelBtn = () => {
        const modal = document.querySelector(".modal-container");
        modal.classList.add("hide");
    }
  
  const handleUpdateClick = (e) => {
    e.preventDefault()
    updateNote(noteValue._id, note.etitle, note.edescription, props.showAlert)
    }
  return (
    <>
      <form className="modal-container hide">
        <div className="etitle">
          <h2 htmlFor="title">Title</h2>
          <input type="text" name="etitle" id="etitle" value={note.etitle} onChange={onChange} autoFocus/>
        </div>
        <div className="edescription">
          <h2 htmlFor="title">Description</h2>
          <input type="text" name="edescription" id="edescription" value={note.edescription} onChange={onChange} />
        </div>
        <div className="buttons">
          <div className='cancel-btn' onClick={cancelBtn}>Cancel</div>
          <button className='update-btn' type="submit" disabled={note.etitle<1} onClick={handleUpdateClick}>Update</button>
        </div>
      </form>
    </>
  );
};

export default Modal;
