import React from 'react'
import Example from './components/testComponent'
import Header from './components/header'
import SudokuBoard from './components/sudokuBoard'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <div className='row'>
        <SudokuBoard />
        <Example />
      </div>
      
    </div>
  )
}

export default App