import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SelectGroupModal = ({ open, onClose, onSave }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleSave = () => {
    if (selectedGroup) {
      onSave(selectedGroup);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select a Group to Save Chat History
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="group-content" id="group-header">
            <Typography variant="h5">Groups</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem button selected={selectedGroup === 'surfTrip'} onClick={() => handleGroupSelect('surfTrip')}>
                <ListItemText primary="Bali Surf Trip" />
              </ListItem>
              <ListItem button selected={selectedGroup === 'friends'} onClick={() => handleGroupSelect('friends')}>
                <ListItemText primary="Bean Bag Boys" />
              </ListItem>
              <ListItem button selected={selectedGroup === 'conversations'} onClick={() => handleGroupSelect('conversations')}>
                <ListItemText primary="Collaborate and Marinate" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={!selectedGroup}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SelectGroupModal;
