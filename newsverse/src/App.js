import './App.css';
import React from 'react'
import Navbar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { useState } from 'react';

function App() {
  
  const [progress, setProgress] = useState(0)

  const handleProgress = (progress) => {
    setProgress(progress)
  }

  return (
    <>
      <Router>
        <Navbar />
         <LoadingBar
          color='#f11946'
          progress={progress}
          loaderSpeed={200}
          transitionTime={300}
          waitingTime={300}
        />
        <Routes>
          <Route exact path="/" element= {<News key="general" country="in" handleProgress={handleProgress} pageSize={12} page={1} category="general"/>}/>
          <Route exact path="/business" element={<News key="business" country="in" handleProgress={handleProgress} pageSize={12} category="business" />}/>
          <Route exact path="/entertainment" element={<News key="entertainment" country="in" handleProgress={handleProgress} pageSize={12} category="entertainment" />}/>
          <Route exact path="/health" element={<News key="health" country="in" handleProgress={handleProgress} pageSize={12} category="health" />}/>
          <Route exact path="/science" element={<News key="science" country="in" handleProgress={handleProgress} pageSize={12} category="science" />}/>
          <Route exact path="/sports" element={<News key="sports" country="in" handleProgress={handleProgress} pageSize={12} category="sports" />}/>
          <Route exact path="/technology" element={<News key="technology" country="in" handleProgress={handleProgress} pageSize={12} category="technology" />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;