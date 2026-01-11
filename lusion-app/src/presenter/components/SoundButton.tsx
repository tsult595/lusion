import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const SoundButtonStyled = styled.button<{
  direction: 'top' | 'bottom' | 'left' | 'right';
}>`
  position: relative;
  width: 60px;
  height: 60px;
  background-color: #c1c7d6;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  
  color: black;
  font-size: 20px;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: #244089;
    border-radius: 50%;

    transform: scale(0);
    transform-origin: ${({ direction }) => direction};
    transition: transform 0.35s ease;
    z-index: -1;
  }

  &:hover {
    color: white; /* 🔥 ВОТ ГЛАВНОЕ */
  }

  &:hover::before {
    transform: scale(1);
  }
`;


const SoundButton: React.FC = () => {
    const [direction, setDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('left');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = Math.abs(x - centerX);
            const deltaY = Math.abs(y - centerY);

            if (deltaX > deltaY) {
                // Horizontal
                setDirection(x < centerX ? 'left' : 'right');
            } else {
                // Vertical
                setDirection(y < centerY ? 'top' : 'bottom');
            }
        }
    };

    return (
        <SoundButtonStyled ref={buttonRef} onMouseEnter={handleMouseEnter} direction={direction}>
            - 
        </SoundButtonStyled>
    );
};

export default SoundButton;