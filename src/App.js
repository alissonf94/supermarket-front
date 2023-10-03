import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './pages/Dashbord';

function App() {

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#E1E667",
        second: '#969945'
      },
      secondary: {
        main: '#3F76A3',
        second: '#223F57',
      },
      third: {
        main: '#E65650',
        second: '#993936'
      },
      dark: '#DEDEDE'

    }

  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
