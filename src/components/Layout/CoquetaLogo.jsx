import React from 'react';

const CoquetaLogo = ({ className = '', size = 40 }) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Silueta femenina */}
            <path 
                d="M50 10C35 10 25 25 25 40C25 55 35 70 50 70C65 70 75 55 75 40C75 25 65 10 50 10Z" 
                fill="currentColor"
            />
            
            {/* Orejas de gato */}
            <path 
                d="M35 15L30 5L25 15M65 15L70 5L75 15" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
            />
            
            {/* Cabello largo */}
            <path 
                d="M35 25C35 25 30 35 30 45C30 55 35 65 40 70M65 25C65 25 70 35 70 45C70 55 65 65 60 70" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
            />
            
            {/* Cola con flecha */}
            <path 
                d="M50 70C50 70 60 75 65 80C70 85 75 90 80 85C85 80 80 75 75 70" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
            />
            <path 
                d="M75 70L80 65L85 70" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
            />
        </svg>
    );
};

export default CoquetaLogo; 