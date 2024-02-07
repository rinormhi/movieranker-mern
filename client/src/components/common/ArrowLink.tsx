import React from "react";
import { Link } from "react-router-dom";

interface ArrowLinkProps {
    target: string;
    name: string;
}

const ArrowLink: React.FC<ArrowLinkProps> = ({ target, name }) => {
    return (
        <Link
            to={target}
            className="text-color-white font-bold">
            {name} <span aria-hidden="true">→</span>
        </Link>
    );
}

export default ArrowLink;