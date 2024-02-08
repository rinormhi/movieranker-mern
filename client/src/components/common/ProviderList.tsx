// ProviderList.tsx
import React from "react";
import Provider from "./Provider";
import { WatchProvider } from "../../interfaces/WatchProvider";

const ProviderList: React.FC<{ providers?: WatchProvider[] }> = ({ providers }) => {
    return (
        <>
            <div className="flex gap-2 mt-4">
                {providers && providers.map(provider => (
                    <Provider key={provider.provider_id} logo_path={provider.logo_path} provider_id={provider.provider_id} />
                ))}
            </div>
        </>
    );
}

export default ProviderList;
