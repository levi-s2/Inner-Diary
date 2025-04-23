import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import Entries from './Entries';

function Diary() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('daily');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/entries')
      .then(r => r.json())
      .then(data => setEntries(data))
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !text || !date || !category) return;
    const newEntry = { title, text, date, category };
    fetch('http://localhost:3000/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
      .then(r => r.json())
      .then(saved => {
        setEntries(prev => [...prev, saved]);
        setTitle('');
        setText('');
        setDate('');
        setCategory('daily');
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/entries/${id}`, { method: 'DELETE' })
      .then(() => setEntries(prev => prev.filter(e => e.id !== id)))
      .catch(console.error);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Diary
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
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
              <TextField
                fullWidth
                size="small"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                size="medium"
                type="submit"
              >
                Add Entry
              </Button>
            </Grid>
          </Grid>

          <Box mt={2}>
            <TextField
              fullWidth
              label="Entry Text"
              multiline
              minRows={4}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      <Entries entries={entries} handleDelete={handleDelete} />
    </Box>
  );
}

export default Diary;
