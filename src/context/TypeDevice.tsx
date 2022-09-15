import React, { createContext, useContext } from 'react';
import { Size } from '../types';
import { useWindowSize } from '../hooks/useWindowSize';

interface IDeviceContext {
  deviceSize: Size | null;
  isDesktop: boolean | undefined;
  isNotebook: boolean | undefined;
  // isTablet: boolean | undefined;
  isPhone: boolean | undefined;
}

const defaultValue: IDeviceContext = {
  deviceSize: null,
  isDesktop: undefined,
  isNotebook: undefined,
  // isTablet: undefined,
  isPhone: undefined,
};

export const DeviceContext = createContext<IDeviceContext>(defaultValue);

const DeviceSizeProvider: React.FC = ({ children }): JSX.Element => {
  const deviceSize = useWindowSize();

  return (
    <DeviceContext.Provider value={{ deviceSize,
      isDesktop: deviceSize.width ? deviceSize.width >= 1200 : undefined,
      isNotebook: deviceSize.width ? deviceSize.width >= 768 && deviceSize.width < 1200 : undefined,
      // isTablet: deviceSize.width ? deviceSize.width >= 768 && deviceSize.width < 1024 : undefined,
      isPhone: deviceSize.width ? deviceSize.width < 768 : undefined }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceSizeProvider;

export const useDeviceContext = (): IDeviceContext => useContext(DeviceContext);
