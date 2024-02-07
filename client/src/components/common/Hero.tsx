import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Button from './Button';
import ArrowLink from './ArrowLink';
import { DialogDefault } from './DialogDefault';

export default function Hero() {

    const { isAuthenticated } = useContext(UserContext);

    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <div className="mx-auto max-w-3xl py-40 px-10 md:px-0">
            <div className="text-center">
                <h1>Bewerte Filme und entdecke die, deiner Freunde</h1>
                <p className="mt-6 text-lg leading-8 text-color-dark-white">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam occaecat fugiat aliqua.
                </p>
            </div>
            {!isAuthenticated ? (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <DialogDefault />                    
                    <ArrowLink target='/login' name='Log in' />
                </div>) :
                ""}
        </div>
    )
}