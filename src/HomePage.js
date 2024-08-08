import React from 'react';
import './ConversationList.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './HomePage.css';

export default function HomePage() {
    const navigate = useNavigate();

    const handleNav = (path) => {
        navigate(path)
    }

    return (
        <div className={"homepage-container"}>
            <Box key={'group'}>
                <Card variant="outlined" sx={{ minWidth: 500, maxWidth: 500, minHeight: 300, maxHeight: 300, mb: 2 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                    Start a new conversation
                    </Typography>
                    <Typography variant="body2" component="div">
                    Chat with an LLM and start a new conversation. Once you're down with the conversation, you can
                    save the conversation to a new or existing group that you share with friends or co-workers.
                    <br/>
                    You can save all forms of collaboartion between you and the AI. This could be raw text, generated code, slides, or even animations.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleNav('chat')}>
                    Start something new
                    </Button>
                </CardActions>
                </Card>
            </Box>             
        </div>
    )
}