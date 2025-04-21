import React from "react";

function Entries({ entries, handleDelete }) {
  if (entries.length === 0) {
    return <p>No entries yet. Write something!</p>;
  }

  const mappedEntries = entries.map(entry => (
    <div key={entry.id} className="entry-card">
      <h2>{entry.text}</h2>
      <p>{entry.date}</p>
      <p><strong>{entry.category}</strong></p>
      <button onClick={() => handleDelete(entry.id)}>Delete</button>
    </div>
  ));

  return (
    <div>
      <h1>Entries</h1>
      {mappedEntries}
    </div>
  );
}

export default Entries;
