import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';

import NavBar from './NavBar';
import Diary from './Diary';
import Notes from './Notes';

const drawerWidth = 240;

export default function App() {
  const [mode, setMode] = useState('light');
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#3182CE' },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          {/* Sidebar */}
          <NavBar onToggleColorMode={toggleColorMode} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: `${drawerWidth}px`,
            }}
          >
            <Routes>
              <Route path="/" element={<Diary />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
