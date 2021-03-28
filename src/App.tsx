import React from 'react';
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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Router>
          <BaseRouter />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
