import React, { useState, useEffect } from "react";

function Notes() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = noteText.trim();
    if (!trimmed) return;

    const newNote = { note: trimmed, isCompleted: false };

    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((saved) => {
        setNotes((prev) => [...prev, saved]);
        setNoteText("");
      })
      .catch((err) => console.error("Error saving note:", err));
  };

  const toggleCompletion = (id, currentStatus) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !currentStatus }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setNotes((prev) =>
          prev.map((n) => (n.id === id ? updated : n))
        );
      })
      .catch((err) => console.error("Error updating note:", err));
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
      })
      .catch((err) => console.error("Error deleting note:", err));
  };

  return (
    <div>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a note..."
        />
        <button type="submit">Add Note</button>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet. Add one above!</p>
      ) : (
        <ul>
          {notes.map(({ id, note, isCompleted }) => (
            <li key={id}>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleCompletion(id, isCompleted)}
              />
              <span
                style={{
                  textDecoration: isCompleted ? "line-through" : "none",
                }}
              >
                {note}
              </span>
              <button onClick={() => deleteNote(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;