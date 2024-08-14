import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ConceptItem = styled(ListItem)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#2c3e50' : '#e0f7fa',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  borderRadius: '8px',
  margin: theme.spacing(1),
  padding: theme.spacing(1, 2),
  minWidth: '120px',
  maxWidth: '240px', // Limit the width to 240px
  display: 'inline-flex',
  justifyContent: 'center',
  flexShrink: 0,
  whiteSpace: 'nowrap', // Prevent text from wrapping
  overflow: 'hidden', // Hide overflowed text
  textOverflow: 'ellipsis', // Add ellipsis if the text is too long
}));

const HorizontalList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between', // Adjust spacing as needed
  overflowX: 'auto', // Allow horizontal scrolling if needed
  padding: 0,
  margin: 0,
}));

const ConceptList = ({ onSelect }) => {
  const concepts = [
    'BFS (Breadth-First Search)',
    'DFS (Depth-First Search)',
    'Linked-Lists',
    'Stacks/Queues',
    'Arrays',
    'String',
  ];

  return (
    <Paper style={{ padding: '8px', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Common Programming Algorithms
      </Typography>
      <HorizontalList>
        {concepts.map((concept, index) => (
          <ConceptItem button key={index} onClick={() => onSelect(concept)}>
            <ListItemText primary={concept} />
          </ConceptItem>
        ))}
      </HorizontalList>
    </Paper>
  );
};

export default ConceptList;
