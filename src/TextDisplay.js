import React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  height: '100%',
  overflowY: 'auto',
  borderRadius: theme.shape.borderRadius,
}));

const CodeBlock = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#2c3e50' : '#f5f5f5',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  marginTop: theme.spacing(2),
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
}));

const TextDisplay = ({ problemData }) => {
  if (!problemData) {
    return (
      <TextContainer>
        <Typography variant="body1">Select a concept to generate a problem.</Typography>
      </TextContainer>
    );
  }

  return (
    <TextContainer>
      <Typography variant="body1" gutterBottom>
        {problemData.description}
      </Typography>
      <CodeBlock>
        {problemData.example}
      </CodeBlock>
    </TextContainer>
  );
};

export default TextDisplay;
