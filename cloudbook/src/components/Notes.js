import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem'
import {useNavigate} from 'react-router-dom'


const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(noteContext)
    const {notes, getNotes} = context
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate('/signup')
        }
      // eslint-disable-next-line
    }, [])
    return (
    <div className="all-notes">
        {notes.map((note) => {
            return <NoteItem key={note._id} title={note.title} description={note.description} note={note} showAlert={props.showAlert} />
        })}
        </div>
    );
}

export default Notes