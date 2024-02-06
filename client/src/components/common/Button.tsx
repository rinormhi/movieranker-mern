import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    target: string;
    name: string;
}


const Button: React.FC<ButtonProps> = ({ target, name }) => {
    return (
        <>
            <Link
                to={target}
                className='rounded-md bg-color-primary px-4 py-2 font-bold transition-all hover:bg-color-primary-hover text-color-dark'>

                {name}
            </Link>
        </>
    );
}

export default Button;