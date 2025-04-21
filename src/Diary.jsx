import React, { useState, useEffect } from "react";
import Entries from './Entries';


function Diary() {
    const [text, setText] = useState('');
    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/entries')
        .then(r => r.json())
        .then(r => setEntries(r))
        .catch(err => console.error('Error fetching entries: ', err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.trim() === '' || date.trim() === '' || category.trim() === '') return;

        const newEntry = {
            text,
            date,
            category
        }

        fetch('http://localhost:3000/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry)
        })
        .then(r => r.json())
        .then(savedEntry => {
            setEntries(prev => [...prev, savedEntry])
            setText('')
            setDate('')
            setCategory('')
        })
        .catch(e => console.error('Error saving new entry: ', e))
    };

    function handleDelete(id) {
        fetch(`http://localhost:3000/entries/${id}`, {
            method: 'DELETE',
        })
        .then(()=> {
            setEntries(prev => prev.filter(entry => entry.id !== id))
        })
        .catch(err => console.error('Error deleting entry: ', err))
    };


    return (
        <div>
            <h1>My Diary</h1>
            <form onSubmit={handleSubmit}>
  <label htmlFor="entry">Entry</label>
  <input
    type="text"
    id="entry"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Write something..."
  />

  <label htmlFor="date">Date</label>
  <input
    type="date"
    id="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    placeholder="Date"
  />

  <label htmlFor="category">Category</label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Select a category</option>
    <option value="personal">Personal</option>
    <option value="daily">Daily</option>
    <option value="secret">Secret</option>
  </select>

  <button type="submit">Add</button>
</form>
    <Entries entries={entries} handleDelete={handleDelete}/>
        </div>
    );
}

export default Diary;
