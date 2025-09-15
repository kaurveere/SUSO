import React, { useEffect, useState, useRef } from 'react';
import './sudokuBoard.css';

const SIZE = 9;

export default function SudokuBoard({ grid, setGrid }) {
  const [selected, setSelected] = useState(null);

  const cellRefs = useRef(
    Array.from({ length: SIZE }, () =>
      Array.from({ length: SIZE }, () => React.createRef())
    )
  );

  const setCell = (row, col, value) => {
    setGrid(prev =>
      prev.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? value : c)) : r
      )
    );
  };

  const handleClick = (row, col) => {
    setSelected({ row, col });
    const btn = cellRefs.current[row][col].current;
    if (btn) btn.focus();
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!selected) return;
      const { row, col } = selected;

      if (e.key >= '1' && e.key <= '9') { e.preventDefault(); setCell(row, col, e.key); return; }
      if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); setCell(row, col, ''); return; }

      let nr = row, nc = col;
      if (e.key === 'ArrowUp') nr = (row + SIZE - 1) % SIZE;
      else if (e.key === 'ArrowDown') nr = (row + 1) % SIZE;
      else if (e.key === 'ArrowLeft') nc = (col + SIZE - 1) % SIZE;
      else if (e.key === 'ArrowRight') nc = (col + 1) % SIZE;
      else return;

      e.preventDefault();
      setSelected({ row: nr, col: nc });
      const nextBtn = cellRefs.current[nr][nc].current;
      if (nextBtn) nextBtn.focus();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <div className="grid" role="grid" aria-label="Sudoku board">
      {Array.from({ length: SIZE }).map((_, row) =>
        Array.from({ length: SIZE }).map((_, col) => {
          const isSelected = selected && selected.row === row && selected.col === col;

          return (
            <button
              key={`${row}-${col}`}
              type="button"
              ref={cellRefs.current[row][col]}
              className={`cell-button ${isSelected ? 'selected' : ''}`}
              onClick={() => handleClick(row, col)}
              role="gridcell"
              aria-selected={isSelected}
            >
              {grid[row][col]}
            </button>
          );
        })
      )}
    </div>
  );
}
