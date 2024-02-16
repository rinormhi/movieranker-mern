import { useContext } from "react";
import { FilterContext } from "../../../context/FilterContext";
import { watchProviderData } from "../../../data/watchprovider";

const Provider: React.FC<{ logo_path: string, provider_id: number }> = ({ logo_path, provider_id }) => {

    const { filter, setFilter, resetFilter } = useContext(FilterContext);

    const handleProviderChange = (id: number) => {
        
        if (filter.watchProviders.length == 52) {
            const updatedProviders = filter.watchProviders.filter((provider) => provider.provider_id === id);
            setFilter({ ...filter, watchProviders: updatedProviders });
        } else if (filter.watchProviders.length == 1 && filter.watchProviders.find((provider => provider.provider_id === id))) {
            setFilter({ ...filter, watchProviders: watchProviderData });
        } else {
            const isProviderInFilter = filter.watchProviders.find((provider) => provider.provider_id === id);
            if (isProviderInFilter) {
                const updatedProviders = filter.watchProviders.filter((provider) => provider.provider_id !== id);
                setFilter({ ...filter, watchProviders: updatedProviders });
            } else {
                const selectedProvider = watchProviderData.find((provider) => provider.provider_id === id);
                if (selectedProvider) {
                    setFilter({ ...filter, watchProviders: [...filter.watchProviders, selectedProvider] })
                }
            }
        }
    }
    return (
        <>
            <div className="w-1/10 cursor-pointer" onClick={() => handleProviderChange(provider_id)} key={provider_id}>
                <img className="rounded-md w-full" src={`http://image.tmdb.org/t/p/w92/${logo_path}`} alt={`Provider ${provider_id}`} />
            </div>
        </>
    );
}

export default Provider