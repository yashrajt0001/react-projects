import React from 'react'
import AddNote from './AddNote';
import './cssHome.css'
import Modal from './Modal';
import Notes from './Notes';

const Home = (props) => {
  return (
    <>
      <div className="container">
        <AddNote />
        <Notes showAlert={props.showAlert} />
      </div>
      <Modal showAlert={ props.showAlert} />
    </>
  );
}

export default Home