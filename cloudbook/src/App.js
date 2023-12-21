import './App.css';
import {useState} from 'react'
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
          {alert && <Alert alert={alert} />}
          <div className="container-1">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            </Routes>
          </div>
          <div className="height" style={{ height: "300px" }}></div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
