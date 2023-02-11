import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import AddMenu from './pages/AddMenu'
import Menu from './pages/Menu'
import {
  BrowserRouter,
  Link,
  Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/:id' element={<Menu/>}/>
        <Route path='/add-menu' element={<AddMenu/>}/>
      </Routes>
    </div>
  )
}

export default App
