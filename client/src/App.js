import React, { useState } from 'react'
import Header from './components/header'
import SudokuBoard from './components/sudokuBoard'
import SubmitPanel from './components/submitPanel'
import './App.css'

const SIZE = 9;

function App() {

  const [grid, setGrid] = useState(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(''))
  );

  const submitGrid = async () => {
    try {
      const res = await fetch('/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grid }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }

      const data = await res.json();
      console.log('Server reply:', data);
      alert('Grid submitted successfully!');
    } catch (err) {
      console.error(err);
      alert(`Failed to submit grid: ${err.message}`);
    }
  };

  return (
    <div>
      <Header />
      <div className='row'>
        <SudokuBoard grid={grid} setGrid={setGrid} />
        <SubmitPanel onSubmit={submitGrid} />
      </div>
      
    </div>
  )
}

export default App