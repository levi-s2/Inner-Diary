import React, { useContext } from 'react';
import { DiaryContext } from '../context/DiaryContext.jsx';
import EntryForm from '../components/EntryForm';
import EntryList from '../components/EntryList';

function Entries() {
  const { entries, addEntry } = useContext(DiaryContext);

  return (
    <div>
      <h2>Diary Entries</h2>
      <EntryForm onAddEntry={addEntry} />
      <EntryList entries={entries} />
    </div>
  );
}

export default Entries;
