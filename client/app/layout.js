'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveAppBar from './components/AppBar';
import React, { useState } from 'react';
import { Box } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Jost, sans-serif',
  },
});

export default function RootLayout({ children }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          <ResponsiveAppBar selectedTab={selectedTab} handleTabChange={handleTabChange} />
          <Box sx={{ mt: 4 }}>
            {React.cloneElement(children, { selectedTab: selectedTab, handleTabChange: handleTabChange })}
          </Box>
        </body>
      </ThemeProvider>
    </html>
  );
}
