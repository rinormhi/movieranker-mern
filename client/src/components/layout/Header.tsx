import Navbar from '../common/Navbar';


export default function Header() {
    return (
        <header className='z-10'>
            <div className="container py-3">
                {/* <Link
                    className='z-10 logo text-2xl font-semibold text-color-primary hover:text-color-primary-hover transition-all'
                    to="/">MovieRanker
                </Link> */}
                {/* <Nav /> */}
                <Navbar></Navbar>
            </div>
        </header>
    )
}
