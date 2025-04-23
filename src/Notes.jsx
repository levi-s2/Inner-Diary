import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Notes
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", gap: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            label="Write a note…"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Note
          </Button>
        </Box>
      </Paper>
      {notes.length === 0 ? (
        <Typography>No notes yet. Add one above!</Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          <List>
            {notes.map(({ id, note, isCompleted }) => (
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteNote(id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isCompleted}
                    onChange={() => toggleCompletion(id, isCompleted)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={note}
                  sx={{
                    textDecoration: isCompleted ? "line-through" : "none",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default Notes;