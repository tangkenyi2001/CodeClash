'use client'
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box
} from '@mui/material';

const mockProblemsSolvedData = [
  { rank: 1, user: 'Ken', problemsSolved: 150 },
  { rank: 2, user: 'Alice', problemsSolved: 145 },
  { rank: 3, user: 'Bob', problemsSolved: 120 },
  { rank: 4, user: 'Charlie', problemsSolved: 110 },
  { rank: 5, user: 'David', problemsSolved: 95 },
];

const mockMaxCoinsData = [
  { rank: 1, user: 'Alice', coins: 10000 },
  { rank: 2, user: 'Ken', coins: 9500 },
  { rank: 3, user: 'Charlie', coins: 8000 },
  { rank: 4, user: 'Bob', coins: 7500 },
  { rank: 5, user: 'David', coins: 6000 },
];

const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="leaderboard tabs">
          <Tab label="Problems Solved" />
          <Tab label="Max Coins Earned" />
        </Tabs>
      </Box>
      {selectedTab === 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="problems solved table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Problems Solved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProblemsSolvedData.map((row) => (
                <TableRow key={row.rank}>
                  <TableCell component="th" scope="row">
                    {row.rank}
                  </TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell align="right">{row.problemsSolved}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {selectedTab === 1 && (
        <TableContainer component={Paper}>
          <Table aria-label="max coins earned table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Coins</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockMaxCoinsData.map((row) => (
                <TableRow key={row.rank}>
                  <TableCell component="th" scope="row">
                    {row.rank}
                  </TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell align="right">{row.coins}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Leaderboard;