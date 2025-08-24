
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Register from './Register';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const RegisterModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="register-modal-title"
      aria-describedby="register-modal-description"
    >
      <Box sx={style}>
        <Register handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default RegisterModal;
