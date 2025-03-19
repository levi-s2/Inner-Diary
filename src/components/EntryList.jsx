import React from 'react';
import EntryItem from './EntryItem';

function EntryList({ entries }) {
  return (
    <div className="entry-list">
      {entries.length === 0 ? <p>No entries yet.</p> : 
        entries.map((entry, index) => <EntryItem key={index} entry={entry} />)}
    </div>
  );
}

export default EntryList;
