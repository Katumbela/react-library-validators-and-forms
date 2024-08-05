
import React, { useEffect, useState } from 'react';

interface SlideUpProps {
  children: React.ReactNode;
  duration?: number; // Duração da animação em milissegundos
  delay?: number; // Atraso antes de iniciar a animação em milissegundos
  initialOffset?: string; // Offset inicial para a animação (por exemplo, '100%')
}

const SlideUp: React.FC<SlideUpProps> = ({
  children,
  duration = 500,
  delay = 0,
  initialOffset = '100%',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      style={{
        transition: `transform ${duration}ms ease-in-out`,
        transform: isVisible ? 'translateY(0)' : `translateY(${initialOffset})`,
      }}
    >
      {children}
    </div>
  );
};

export default SlideUp;
