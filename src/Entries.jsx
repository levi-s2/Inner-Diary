import React from "react";
import { Grid, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Entries({ entries, handleDelete }) {
  if (entries.length === 0) {
    return <Typography>No entries yet.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {entries.map(({ id, title, text, date, category }) => (
        <Grid item xs={12} sm={6} md={4} key={id}>
          <Paper sx={{ p: 2, position: "relative" }}>
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => handleDelete(id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {date} &bull; {category}
            </Typography>
            <Typography variant="body1" mt={1}>
              {text}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
