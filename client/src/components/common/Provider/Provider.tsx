import React from 'react';

interface ProviderProps {
    logo_path: string;
    provider_name: string;
}

const Provider: React.FC<ProviderProps> = ({ logo_path, provider_name }) => {
    return (
        <img className={`rounded-lg opacity-100 h-10 w-auto`} src={`http://image.tmdb.org/t/p/w92/${logo_path}`} alt={`${provider_name}`} />
    );
}

export default Provider;
