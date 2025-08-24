'use client';

import React from 'react';
import Main from './components/Main';
import { Box } from '@mui/material';

export default function HomePage({ selectedTab, handleTabChange }) {
  return (
    <main>
      <Main selectedTab={selectedTab} handleTabChange={handleTabChange} />
    </main>
  );
}
