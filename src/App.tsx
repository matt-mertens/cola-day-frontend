import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import BaseRouter from './routes/routes';

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: '#fafafa',
    },
    primary: {
      main: '#6a6a6a',
    },
    secondary: {
      main: '#333333',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    primary: {
      main: '#dd7700',
    },
    secondary: {
      main: '#1f2937',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});


function App() {
  const [themeMode, toggleThemeMode] = useState('light');

  return (
    <div className="App">
      <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <Router>
          <BaseRouter />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
