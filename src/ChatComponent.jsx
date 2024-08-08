import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ChatContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ChatHistory = styled(Paper)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const UserMessage = styled(ListItem)(({ theme }) => ({
  textAlign: 'right',
  backgroundColor: '#e0f7fa',
  borderRadius: '8px',
  margin: '4px',
  padding: '8px',
}));

const BotMessage = styled(ListItem)(({ theme }) => ({
  textAlign: 'left',
  backgroundColor: '#f1f8e9',
  borderRadius: '8px',
  margin: '4px',
  padding: '8px',
}));

const InputArea = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

const ChatComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const userMessage = { text: prompt, isUser: true };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await fetch('https://study-buddy-max.netlify.app/api/open-question', {
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
      const botMessage = { text: data.response, isUser: false };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage = { text: 'Error: Unable to get response from server.', isUser: false };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }

    setPrompt('');
  };

  return (
    <ChatContainer>
      <ChatHistory>
        <List>
          {chatHistory.map((message, index) => (
            message.isUser ? (
              <UserMessage key={index}>
                <ListItemText primary={message.text} />
              </UserMessage>
            ) : (
              <BotMessage key={index}>
                <ListItemText primary={message.text} />
              </BotMessage>
            )
          ))}
        </List>
      </ChatHistory>
      <InputArea>
        <TextField
          fullWidth
          value={prompt}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter your prompt here..."
          variant="outlined"
        />
        <Button size="small" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </InputArea>
    </ChatContainer>
  );
};

export default ChatComponent;
