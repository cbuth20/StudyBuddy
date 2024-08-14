import React, { useState } from 'react';
import { Container } from '@mui/material';
import ConceptList from './ConceptList';
import TextDisplay from './TextDisplay';
import { styled } from '@mui/material/styles';
import CodeEditor from './CodeEditor';

const ChatContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  height: '100vh', // Full height of the viewport
  padding: theme.spacing(2),
}));

const ConceptArea = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ChatArea = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1, // Allow this area to grow and take full space
  gap: theme.spacing(2),
}));

const ChatComponent = () => {
  const [problemData, setProblemData] = useState(null);

  const handleConceptSelect = async (concept) => {

    const prompt = `Create me a ${concept} coding problem. Include a description, and 2 examples input and expected outputs. Give me the response in the following JSON format: {description: <description here>, example: <example here> }.`;

    try {
      const response = await fetch('https://study-buddy-max.netlify.app/.netlify/functions/server/api/open-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProblemData(data);
    } catch (error) {
      console.error('Error fetching problem:', error);
    }
  };

  return (
    <ChatContainer>
      <ConceptArea>
        <ConceptList onSelect={handleConceptSelect} />
      </ConceptArea>
      <ChatArea>
        <div style={{ flex: 1 }}>
          <TextDisplay problemData={problemData} />
        </div>
        <div style={{ flex: 2 }}>
          <CodeEditor problemData={problemData} />
        </div>
      </ChatArea>
    </ChatContainer>
  );
};

export default ChatComponent;
