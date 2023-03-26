import React, { useContext, useEffect, CSSProperties } from 'react';
import styled from 'styled-components';
import { theme } from '../';
import Text from './text';
import { getTextColorFromBackground, lighten } from './colorCheck';
import { v4 as uuidv4 } from 'uuid';

interface ButtonProps {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'accent' | string;
  key?: string | 'auto';
  ariaLabel?: string;
  tabIndex?: number;
  rounded?: boolean;
  visible?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  style = {},
  id,
  type = 'button',
  color = 'primary',
  key = 'auto',
  ariaLabel,
  tabIndex,
  rounded = false,
  visible = true,
}) => {
  useEffect(() => {
    // Add any necessary side effects here
  }, []);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const getButtonColor = () => {
    switch (color) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary;
      case 'accent':
        return theme.accent;

      default:
        return color;
    }
  };

  const buttonColor = getButtonColor();
  const borderRadius = rounded ? '5px' : 0;
  const buttonKey = key === 'auto' ? uuidv4() : key;

  if (!visible) {
    return null;
  }

  return (
    <StyledButton
      type={type}
      className={`${className}`}
      style={{
        backgroundColor: buttonColor,
        color: getTextColorFromBackground(buttonColor),
        borderRadius,
        ...style,
      }}
      id={id}
      key={buttonKey}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      $color={buttonColor}
    >
      <Text size="body" style={{ margin: 0 }}>
        {children}
      </Text>
    </StyledButton>
  );
};

const StyledButton = styled.button<{$color: string}>`
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  &:hover {
    transform: translateY(-3px);
    background-color: ${(props) => lighten(props.$color, 0.1)};
  }
`;

export default Button;
