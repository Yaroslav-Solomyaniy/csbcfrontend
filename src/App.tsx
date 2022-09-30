import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import DeviceSizeProvider from './context/All/DeviceType';

const App = (): JSX.Element => (
  <BrowserRouter>
    <DeviceSizeProvider><AppRoutes /></DeviceSizeProvider>
  </BrowserRouter>
);

export default App;
