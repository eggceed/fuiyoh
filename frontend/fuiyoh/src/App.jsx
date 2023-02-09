import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Card from './components/Card'
import {
  Route,
  Routes,
} from "react-router-dom";


function App() {

  return (
    <div className="App">
      {/* <Routes>
        <Route path='/:id' element={}/>
      </Routes> */}
      <Card/>
    </div>
  )
}

export default App
