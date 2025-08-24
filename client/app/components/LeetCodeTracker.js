'use client';

import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Tabs, Tab, Box, Checkbox, Accordion, AccordionSummary, AccordionDetails 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'; // or fetch

const LeetCodeTracker = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [blind75, setBlind75] = useState({});
  const [neetCode150, setNeetCode150] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCheckboxChange = async (id, listType, category, completed) => {
    if (!token) return;

    const listSetter = listType === 'Blind75' ? setBlind75 : setNeetCode150;
    const list = listType === 'Blind75' ? blind75 : neetCode150;

    const updatedCategory = list[category].map(q => q.id === id ? { ...q, completed: !q.completed } : q);
    const updatedList = { ...list, [category]: updatedCategory };
    listSetter(updatedList);

    const endpoint = completed ? `/questions/${id}/incomplete/` : `/questions/${id}/complete/`;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Failed to update question status:', error);
      // Revert the change in UI on failure
      const revertedCategory = list[category].map(q => q.id === id ? { ...q, completed: completed } : q);
      const revertedList = { ...list, [category]: revertedCategory };
      listSetter(revertedList);
    }
  };

  const fetchProgress = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/progress/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      // Group by list_type and then by category
      const grouped = data.reduce((acc, item) => {
        const listType = item.list_type; // "Blind75" or "NeetCode150"
        if (!acc[listType]) acc[listType] = {};
        if (!acc[listType][item.category]) acc[listType][item.category] = [];
        acc[listType][item.category].push(item);
        return acc;
      }, {});

      setBlind75(grouped['Blind75'] || {});
      setNeetCode150(grouped['NeetCode150'] || {});
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProgress();
    }
  }, [token]);

  const renderCategory = (data, listType) => {
    return Object.keys(data).map(category => (
        <Accordion key={category}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data[category].map(question => (
                                <TableRow key={question.id}>
                                    <TableCell>
                                        <Checkbox 
                                          checked={question.completed} 
                                          onChange={() => handleCheckboxChange(question.id, listType, category, question.completed)} 
                                          disabled={!token}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <a href={question.url} target="_blank" rel="noopener noreferrer">
                                            {question.title}
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    ));
  }

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="leetcode lists tabs">
          <Tab label="Blind 75" />
          <Tab label="NeetCode 150" />
        </Tabs>
      </Box>
      {selectedTab === 0 && renderCategory(blind75, 'Blind75')}
      {selectedTab === 1 && renderCategory(neetCode150, 'NeetCode150')}
    </Container>
  );
};

export default LeetCodeTracker;
