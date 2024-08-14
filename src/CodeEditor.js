import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Select, MenuItem, FormControl, InputLabel, Button, Modal, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const EditorContainer = styled('div')(({ theme }) => ({
  height: "90vh",
  backgroundColor: "#1e1e1e",
  padding: "20px",
  display: 'flex',
  flexDirection: 'column',
}));

const LanguageSelector = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  minWidth: 120,
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
}));

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: 24,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

function CodeEditor({ problemData }) {
  const [code, setCode] = useState("// Write your code here\n");
  const [language, setLanguage] = useState("javascript");
  const [modalOpen, setModalOpen] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState("");

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleEvaluateCode = async () => {
    if (!problemData) {
      alert("Please select a concept and generate a problem first.");
      return;
    }

    try {
      const response = await fetch('https://study-buddy-max.netlify.app/.netlify/functions/server/api/evaluate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          problem: problemData,
        }),
      });

      if (!response.ok) {
        throw new Error('Error evaluating code');
      }

      const result = await response.json();
      setEvaluationResult(result.message || "Evaluation complete.");
      setModalOpen(true);  // Open the modal with the result
    } catch (error) {
      console.error('Error evaluating code:', error);
      setEvaluationResult("Failed to evaluate the code.");
      setModalOpen(true);  // Open the modal even if there was an error
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (problemData) {
      const newCode = `// Description: ${problemData.description}\n\n// Example: ${problemData.example}\n\n`;
      setCode(newCode);
    }
  }, [problemData]);

  return (
    <EditorContainer>
      <LanguageSelector variant="outlined">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          label="Language"
          style={{ color: 'white' }}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="java">Java</MenuItem>
        </Select>
      </LanguageSelector>
      <Editor
        height="calc(100% - 140px)"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
      <ButtonContainer>
        <Button variant="contained" color="primary" onClick={handleEvaluateCode}>
          Evaluate Code
        </Button>
      </ButtonContainer>

      {/* Modal for displaying the server's response */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="evaluation-result-title"
        aria-describedby="evaluation-result-description"
      >
        <ModalBox>
          <Typography id="evaluation-result-title" variant="h6" component="h2">
            Evaluation Result
          </Typography>
          <Typography id="evaluation-result-description" sx={{ mt: 2 }}>
            {evaluationResult}
          </Typography>
          <Button variant="contained" onClick={handleCloseModal} style={{ marginTop: '16px' }}>
            Close
          </Button>
        </ModalBox>
      </Modal>
    </EditorContainer>
  );
}

export default CodeEditor;
