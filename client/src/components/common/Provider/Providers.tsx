import React from "react";
import { Provider } from "../../../interfaces/Provider";
import ProviderLogo from "./Provider";

interface ProvidersProps {
    providers?: Provider;
    type: 'buy' | 'rent' | 'flatrate';
}

const Providers: React.FC<ProvidersProps> = ({ providers, type }) => {

    if (!providers) {
        return <div>Keine Daten vorhanden</div>; // Oder was auch immer du hier anzeigen möchtest
    }

    return (
        <div className="flex gap-2 mt-2">
            {providers[type] ? (
                providers[type].map(provider => (
                    <ProviderLogo logo_path={provider.logo_path} provider_name={provider.provider_name} />
                ))
            ) : "Es gibt keine Streamingangebote"}
        </div>
    );
}

export default Providers;
