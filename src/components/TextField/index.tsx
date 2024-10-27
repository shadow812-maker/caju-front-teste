import { ComponentType, InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

// Create a base styles object that can be shared
const inputStyles = `
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid ${(props: { isValid?: boolean }) => props.isValid ? '#2FCC71' : 'rgba(36, 28, 21, 0.3)'};
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid ${(props: { isValid?: boolean }) => props.isValid ? '#2FCC71' : '#007c89'};
    box-shadow: inset 0 0 0 1px ${(props: { isValid?: boolean }) => props.isValid ? '#2FCC71' : '#007c89'};
  }
`;

export const Input = styled.input<{ isValid?: boolean }>`
  ${inputStyles}
`;

// Create a styled component wrapper that can be used for custom components
export const StyledWrapper = styled.div<{ isValid?: boolean }>`
  & input {
    ${inputStyles}
  }
`;

type Props = {
  label?: string;
  error?: string;
  isValid?: boolean;
  mask?: string;
  as?: ComponentType<any>;
} & InputHTMLAttributes<any>;

const TextField = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { isValid, as: Component = Input, ...rest } = props;
  
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {Component === Input ? (
        <Input ref={ref} {...rest} isValid={isValid}/>
      ) : (
        <StyledWrapper isValid={isValid}>
          <Component ref={ref} {...rest} />
        </StyledWrapper>
      )}
      <span style={{fontSize: 12, color: 'red'}}>{props.error}</span>
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
