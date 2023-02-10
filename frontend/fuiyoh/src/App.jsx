import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import NavBar from './components/NavBar'
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
// import BigCard from './components/BigCard';


function App() {

  return (
    <div className="App">
    <NavBar/>
      {/* <Routes>
        <Route path='/:id' element={}/>
      </Routes> */}
      <Card/>
    </div>
  )
}

export default App
