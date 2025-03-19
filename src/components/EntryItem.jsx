import React from 'react';

function EntryItem({ entry }) {
  return (
    <div className="entry-item">
      <p>{entry}</p>
    </div>
  );
}

export default EntryItem;
