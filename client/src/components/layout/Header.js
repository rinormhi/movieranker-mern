import { Fragment, useContext, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../axiosInstance';

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const { isAuthenticated, setIsAuthenticated, user } = useContext(UserContext);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logout = () => {
        axiosInstance.post("/auth/logout")
            .then(res => {
                console.log("Res:", res);
                setIsAuthenticated(false);
                console.log(isAuthenticated);
            })
            .catch(err => {
                console.log("Err", err);
            });
    }

    return (
        <header className='z-10'>
            <div className="wrapper max-w-7xl mx-auto py-10 flex justify-between items-center">
                <Link
                    className='z-10 logo text-xl font-bold'
                    to="/">MovieRanker
                </Link>
                <nav className='z-10 flex gap-5 font-semibold hover:text-red'>
                    <Link
                        to="/movies"
                    >
                        Movies
                    </Link>
                </nav>
                <div className="z-10">
                    {isAuthenticated ?
                        <>
                            <Link
                                to="my-profile"
                                className="z-10 -mx-3 block rounded-lg px-3text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {user.username}
                            </Link>
                            <Link
                                onClick={logout}>
                                Log out
                            </Link>
                        </> :
                        <Link
                            to="/login"
                            className="z-10 -mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                            Log in
                        </Link>
                    }
                </div>
            </div>
        </header>
    )
}
