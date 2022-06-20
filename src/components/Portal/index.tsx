import ReactDOM from 'react-dom';

interface IPortal {
  children: JSX.ElementChildrenAttribute;
  ref: HTMLDivElement | null;
}

const Portal = ({
  children,
  ref,
}: IPortal): JSX.Element => ReactDOM.createPortal(children, ref);

export default Portal;
