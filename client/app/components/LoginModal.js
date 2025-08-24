
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Login from './Login';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const LoginModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={style}>
        <Login handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default LoginModal;
