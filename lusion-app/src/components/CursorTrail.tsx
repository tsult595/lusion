import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TrailDot = styled.div<{ x: number; y: number; delay: number }>`
  position: fixed;
  width: 8px;
  height: 8px;
  background: rgba(255, 0, 142, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease-out;
  transform: translate(${props => props.x}px, ${props => props.y}px) scale(${props => 1 - props.delay * 0.1});
`;

const CursorTrail: React.FC = () => {
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<{ x: number; y: number }[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const numDots = 10;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const updateTrail = () => {
      positions.current.unshift({ ...mousePos.current });
      if (positions.current.length > numDots) {
        positions.current.pop();
      }

      trailRefs.current.forEach((dot, index) => {
        if (dot && positions.current[index]) {
          const { x, y } = positions.current[index];
          dot.style.transform = `translate(${x - 4}px, ${y - 4}px) scale(${1 - index * 0.1})`;
          dot.style.opacity = `${1 - index * 0.1}`;
        }
      });

      requestAnimationFrame(updateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    updateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <TrailDot
          key={i}
          ref={el => (trailRefs.current[i] = el)}
          x={0}
          y={0}
          delay={i}
        />
      ))}
    </>
  );
};

export default CursorTrail;