import { Typography } from "@material-tailwind/react";

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="mx-auto max-w-7xl full bg-white p-8">
            <div className="text-color-link">
                <ul className="flex justify-center gap-20">
                    <li>
                        Menu 1
                    </li>
                    <li>
                        Menu 2
                    </li>
                    <li>
                        Menu 3
                    </li>
                    <li>
                        Menu 4
                    </li>
                </ul>
            </div>
            <hr className="border-color-dark-white my-9" />
            <div className="text-center text-color-white">
                &copy; {year} | MovieRanker
            </div>
        </footer>
    );
}

export default Footer;