import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper
} from "@mui/material";
import Entries from "./Entries";

export default function Diary() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/entries")
      .then(r => r.json())
      .then(data => setEntries(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !text || !date || !category) return;

    const newEntry = { title, text, date, category };
    fetch("http://localhost:3000/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    })
      .then(r => r.json())
      .then(saved => {
        setEntries(prev => [...prev, saved]);
        setTitle(""); setText(""); setDate(""); setCategory("");
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/entries/${id}`, { method: "DELETE" })
      .then(() => setEntries(prev => prev.filter(e => e.id !== id)));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Diary
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="secret">Secret</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ height: "100%" }}
              onClick={handleSubmit}
            >
              Add Entry
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Entry Text"
              multiline
              minRows={4}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Entries list */}
      <Entries entries={entries} handleDelete={handleDelete} />
    </Box>
  );
}
