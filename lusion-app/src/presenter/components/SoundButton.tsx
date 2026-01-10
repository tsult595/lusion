import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const SoundButtonStyled = styled.button<{ direction: 'top' | 'bottom' | 'left' | 'right' }>`
    position: relative;
    padding: 20px 26px;
    background-color: #c1c7d6ff;
    color: black;
    border: none;
    border-radius: 60%;
    cursor: pointer;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 60%;
        background-color: #244089ff;
        transform: scale(0);
        transform-origin: ${({ direction }) => direction};
        transition: transform 0.3s ease;
       
    }

    &:hover::before {
        transform: scale(1);
         color: white;
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