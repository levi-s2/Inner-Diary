import React from "react";

function Entries({ entries }) {
  const mappedEntries = entries.map(entry => (
    <div key={entry.id} className="entry-card">
      <h2>{entry.text}</h2>
      <p>{entry.date}</p>
      <p><strong>{entry.category}</strong></p>
    </div>
  ));

  return (
    <div>
      <h1>Entries</h1>
      {entries.length === 0 ? (
        <p>No entries yet. Write something!</p>
      ) : (
        mappedEntries
      )}
    </div>
  );
}

export default Entries;
