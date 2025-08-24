'use client'
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from '@mui/material';

const initialTournamentsData = [
  { id: 1, name: 'Weekly Contest 350', description: 'A weekly contest to challenge your coding skills.' },
  { id: 2, name: 'Biweekly Contest 100', description: 'A biweekly contest for all levels.' },
  { id: 3, name: 'Summer Code Jam', description: 'A special event for the summer.' },
];

const Tournaments = () => {
  const [tournaments, setTournaments] = useState(initialTournamentsData);
  const [open, setOpen] = useState(false);
  const [newTournament, setNewTournament] = useState({ name: '', description: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setTournaments([...tournaments, { ...newTournament, id: tournaments.length + 1 }]);
    setNewTournament({ name: '', description: '' });
    handleClose();
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tournaments
        </Typography>
        <Button variant="contained" onClick={handleClickOpen}>Create Tournament</Button>
      </Box>
      <Grid container spacing={3}>
        {tournaments.map((tournament) => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {tournament.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {tournament.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Join</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new tournament</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tournament Name"
            type="text"
            fullWidth
            variant="standard"
            value={newTournament.name}
            onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newTournament.description}
            onChange={(e) => setNewTournament({ ...newTournament, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tournaments;