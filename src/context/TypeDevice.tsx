import React, { createContext, useContext, useEffect, useState } from 'react';
import { Size } from '../types';
import { useWindowSize } from '../hooks/useWindowSize';

interface IDeviceContext {
  deviceSize: Size | null;
  isDesktop: boolean | null;
  isTablet: boolean | null;
  isPhone: boolean | null;
}

const defaultValue: IDeviceContext = {
  deviceSize: null,
  isDesktop: null,
  isTablet: null,
  isPhone: null,
};

export const DeviceContext = createContext<IDeviceContext>(defaultValue);

const DeviceSizeProvider: React.FC = ({ children }): JSX.Element => {
  const deviceSize = useWindowSize();

  return (
    <DeviceContext.Provider value={{ deviceSize,
      isDesktop: deviceSize.width ? deviceSize.width >= 1200 : null,
      isTablet: deviceSize.width ? deviceSize.width >= 768 && deviceSize.width < 1199 : null,
      isPhone: deviceSize.width ? deviceSize.width < 768 : null }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceSizeProvider;

export const useDeviceContext = (): IDeviceContext => useContext(DeviceContext);
