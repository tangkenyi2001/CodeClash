'use client'
import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const initialFriendsData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const initialFriendRequestsData = [
  { id: 1, name: 'David' },
  { id: 2, name: 'Eve' },
];

const Friends = () => {
  const [friends, setFriends] = useState(initialFriendsData);
  const [friendRequests, setFriendRequests] = useState(initialFriendRequestsData);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [acceptRequestOpen, setAcceptRequestOpen] = useState(false);
  const [friendName, setFriendName] = useState('');

  const handleAddFriendOpen = () => setAddFriendOpen(true);
  const handleAddFriendClose = () => setAddFriendOpen(false);
  const handleAcceptRequestOpen = () => setAcceptRequestOpen(true);
  const handleAcceptRequestClose = () => setAcceptRequestOpen(false);

  const handleSendRequest = () => {
    // Here you would typically send a friend request to the server
    console.log(`Friend request sent to ${friendName}`);
    setFriendName('');
    handleAddFriendClose();
  };

  const handleAccept = (id) => {
    const request = friendRequests.find(req => req.id === id);
    setFriends([...friends, { id: friends.length + 1, name: request.name }]);
    setFriendRequests(friendRequests.filter(req => req.id !== id));
  };

  const handleDecline = (id) => {
    setFriendRequests(friendRequests.filter(req => req.id !== id));
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Friends
        </Typography>
        <Button variant="contained" onClick={handleAddFriendOpen} sx={{ mr: 2 }}>Add Friend</Button>
        <Button variant="contained" onClick={handleAcceptRequestOpen}>Accept Friend Requests</Button>
      </Box>
      <Paper>
        <List>
          {friends.map((friend) => (
            <ListItem key={friend.id}>
              <ListItemText primary={friend.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Add Friend Dialog */}
      <Dialog open={addFriendOpen} onClose={handleAddFriendClose}>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Friend's Username"
            type="text"
            fullWidth
            variant="standard"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFriendClose}>Cancel</Button>
          <Button onClick={handleSendRequest}>Send Request</Button>
        </DialogActions>
      </Dialog>

      {/* Accept Friend Request Dialog */}
      <Dialog open={acceptRequestOpen} onClose={handleAcceptRequestClose}>
        <DialogTitle>Friend Requests</DialogTitle>
        <DialogContent>
          <List>
            {friendRequests.map((request) => (
              <ListItem key={request.id}>
                <ListItemText primary={request.name} />
                <IconButton edge="end" aria-label="accept" onClick={() => handleAccept(request.id)}>
                  <CheckIcon />
                </IconButton>
                <IconButton edge="end" aria-label="decline" onClick={() => handleDecline(request.id)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptRequestClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Friends;