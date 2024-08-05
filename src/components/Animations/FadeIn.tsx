// src/components/Animations/FadeIn.tsx
import React, { useEffect, useState } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    duration?: number; // Duração da animação em milissegundos
    delay?: number; // Atraso antes de iniciar a animação em milissegundos
}

const FadeIn: React.FC<FadeInProps> = ({ children, duration = 500, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <div
            style={{
                transition: `opacity ${duration}ms ease-in-out`,
                opacity: isVisible ? 1 : 0,
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;
