import ReactDOM from 'react-dom';

const Portal = ({ children }: JSX.ElementChildrenAttribute): JSX.Element => ReactDOM.createPortal(
  children,
  document.getElementById('modal') as Element,
);

export default Portal;
