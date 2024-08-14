import React from 'react';
import ChatComponent from './ChatComponent';
import AppHeader from './AppHeader';
import HomePage from './HomePage';
import StudyComponent from './StudyComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
// import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Authenticator>
        {({ signOut, user }) => (
          <div className="App">
            <Router>
              <AppHeader signOut={signOut} user={user} />
              <div style={{ paddingTop: '48px' }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/chat/:id?" element={<ChatComponent />} />
                </Routes>
              </div>
            </Router>
          </div>
        )}
      </Authenticator> */}
      <div className="App">
        <Router>
          <AppHeader signOut={undefined} user={undefined} />
          <div style={{ paddingTop: '48px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat/:id?" element={<ChatComponent />} />
              <Route path="/study" element={<StudyComponent />} />
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;



