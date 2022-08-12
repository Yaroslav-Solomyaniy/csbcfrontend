import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

const App = (): JSX.Element => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
