'use client';

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import LeetCodeTracker from './LeetCodeTracker';
import LeetCodeQuestionsPage from '../leetcode/page.js';
import Tournaments from '../tournaments/page.js';
import Leaderboard from '../leaderboard/page.js';
import Friends from '../friends/page.js';

const Main = ({ selectedTab, handleTabChange }) => {
  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {selectedTab === 0 && <LeetCodeTracker />}
      {selectedTab === 1 && <Tournaments />}
      {selectedTab === 2 && <Leaderboard />}
      {selectedTab === 3 && <Friends />}
    </Box>
  );
};

export default Main;
