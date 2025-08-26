import React from 'react'
import './sudokuBoard.css'

function SudokuBoard() {

    const size = 9;

    const handleClick = (row, col) => {
        alert(`You clicked button [${row}][${col}]`);
    };

    return ( 
        <div className="grid">
            {Array.from({ length: 9 }).map((_, row) =>
                Array.from({ length: 9 }).map((_, column) => (
                <button key={`${row}-${column}`} className="cell-button" onClick={() => handleClick(row, column)}>{row},{column}</button>
                ))
            )}
        </div>
    );
}

export default SudokuBoard