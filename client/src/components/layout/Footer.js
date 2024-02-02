import { Typography } from "@material-tailwind/react";

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className="mx-auto max-w-7xl full bg-white p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:flex-end">
                {/* <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" /> */}
                <ul className="z-10 flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            About Us
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            License
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contribute
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Contact Us
                        </Typography>
                    </li>
                </ul>
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography color="blue-gray" className="z-10 text-center font-normal">
                &copy; {year} MovieRanker
            </Typography>
        </footer>
    );
}

export default Footer;