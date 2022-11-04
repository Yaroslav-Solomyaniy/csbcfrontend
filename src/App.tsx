import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import DeviceSizeProvider from './context/All/DeviceType';
import './normalize.css';

const App = (): JSX.Element => (
  <BrowserRouter>
    <DeviceSizeProvider><AppRoutes /></DeviceSizeProvider>
  </BrowserRouter>
);

export default App;
