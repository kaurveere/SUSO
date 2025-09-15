import React, { useState } from 'react';

export default function SubmitPanel({ onSubmit }) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onSubmit();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="submit-panel">
      <button type="button" onClick={handleClick} disabled={busy}>
        {busy ? 'Sending…' : 'Send grid to backend'}
      </button>
    </div>
  );
}
