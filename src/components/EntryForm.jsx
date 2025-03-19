import React, { useState } from 'react';

function EntryForm({ onAddEntry }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddEntry(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Write your diary entry..." 
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default EntryForm;
