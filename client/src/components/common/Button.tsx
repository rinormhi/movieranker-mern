import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from '../../interfaces/ButtonProps';

const Button: React.FC<ButtonProps> = ({ target, name, onclick, classes, type = "button" }) => {
    const classBody = `rounded-md bg-color-primary px-4 py-2 font-bold transition-all hover:bg-color-primary-hover text-color-dark ${classes ? classes : ""}`;

    return (
        <>
            {target ? (
                <Link
                    to={target}
                    className={classBody}>
                    {name}
                </Link>
            ) : (
                <button
                    type={type}
                    className={classBody}
                    onClick={onclick}
                >
                    {name}
                </button>
            )}
        </>
    );
}

export default Button;
