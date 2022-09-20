import React, { ChangeEvent } from 'react';
import { useDeviceContext } from '../../../context/TypeDevice';
import InputDesktop from './type/Desktop/InputDesktop';
import InputMobile from './type/Mobile/InputMobile';

interface IModalInput {
  inputType?: string;
  label?: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string | boolean;
  placeholder?: string;
  pattern?: RegExp;
  className?: string;
}

const ModalInput = ({
  className,
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  pattern,
  inputType,
}: IModalInput): JSX.Element => {
  const { isDesktop, isTablet, isPhone } = useDeviceContext();

  return (
    <>
      {isDesktop && (
      <InputDesktop
        inputType={inputType || ''}
        label={label || ''}
        value={value}
        onChange={onChange}
        required={required || false}
        error={error || ''}
        placeholder={placeholder || ''}
        pattern={pattern}
        className={className || ''}
      />
      )}

      {(isTablet || isPhone) && (
      <InputMobile
        inputType={inputType || ''}
        label={label || ''}
        value={value}
        onChange={onChange}
        required={required || false}
        error={error || ''}
        placeholder={placeholder || ''}
        pattern={pattern}
        className={className || ''}
      />
      )}

    </>
  );
};

ModalInput.defaultProps = {
  inputType: 'text',
  label: '',
  required: false,
  placeholder: '',
  error: '',
  pattern: '',
  className: '',
};

export default ModalInput;
