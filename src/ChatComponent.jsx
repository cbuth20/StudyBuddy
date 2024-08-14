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
import CodeEditor from './CodeEditor';

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
  textAlign: 'left',
  backgroundColor: theme.palette.mode === 'dark' ? '#2c3e50' : '#e0f7fa',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  borderRadius: '8px',
  margin: '4px 16px 4px auto',
  padding: '12px 16px',
  maxWidth: '70%',
}));

const BotMessage = styled(ListItem)(({ theme }) => ({
  textAlign: 'left',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  borderRadius: '8px',
  margin: '4px auto 4px 16px',
  padding: '12px 16px',
  maxWidth: '70%',
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
    setPrompt('');
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
      const botMessage = { text: data.response, isUser: false };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage = { text: 'Error: Unable to get response from server.', isUser: false };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }
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
