import { Typography } from "@material-tailwind/react";

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-color-dark-hover p-10 mt-20 px-2">
            <div className="mx-auto max-w-7xl">
                <div className="text-center text-color-white">
                    &copy; {year} | MovieRanker
                </div>
            </div>
        </footer>
    );
}

export default Footer;