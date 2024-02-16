import { useContext, useEffect, useRef, useState } from "react";
import { FilterContext } from "../../../context/FilterContext";
import { watchProviderData } from "../../../data/watchprovider";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import axiosInstance from "../../../axiosInstance";
import { WatchProvider } from '../../../interfaces/WatchProvider'

const ProviderList = () => {

    const [providers, setProviders] = useState<WatchProvider[]>();
    const { filter, setFilter, resetFilter } = useContext(FilterContext);

    useEffect(() => {
        axiosInstance
            .get("/api/movies/watchproviders")
            .then((res => {
                setProviders(res.data);
            }))
            .catch((err: Error) => {
                console.log("/api/movies/getwatchproviders ERROR:", err);
            })
    }, [filter]);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleProviderChange = (id: number) => {

        console.log(filter.watchProviders.length);

        if (filter.watchProviders.length == watchProviderData.length) {
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

    const scrollRight = () => {
        requestAnimationFrame(() => {
            if (containerRef.current) {
                const scrollLeft = containerRef.current.scrollLeft;
                const itemWidth = parseInt(
                    getComputedStyle(containerRef.current.children[0]).width
                )
                containerRef.current.scrollLeft = scrollLeft + itemWidth * 21;
            }
        })
    }

    const scrollLeft = () => {
        requestAnimationFrame(() => {
            if (containerRef.current) {
                const scrollLeft = containerRef.current.scrollLeft;
                const itemWidth = parseInt(
                    getComputedStyle(containerRef.current.children[0]).width
                )
                containerRef.current.scrollLeft = scrollLeft - itemWidth * 21;
            }
        })
    }


    return (
        <>
            <div className="relative mt-4" >
                <button className="absolute -left-2 bg-gradient-to-r from-color-dark to-transparent top-0 bottom-0 flex items-center justify-center" onClick={scrollLeft}>
                    <ChevronLeftIcon className="w-8 fill-color-white" />
                </button>
                <div ref={containerRef} className="flex nowrap flex-nowrap overflow-scroll overflow-x-scroll w-[97%] mx-auto whitespace-nowrap no-scrollbar scroll-smooth scroll-ml-10">
                    {watchProviderData.map(provider => (
                        <div className="basis-[50px] shrink-0 grow-0 mr-2 cursor-pointer" onClick={() => handleProviderChange(provider.provider_id)} key={provider.provider_id}>
                            <img className={`rounded-md w-full opacity-100 transition-all duration-300 ${filter.watchProviders.find((selectedProvider) => selectedProvider.provider_id === provider.provider_id) ? 'opacity-100' : 'opacity-50'}`} src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`} alt={`Provider ${provider.provider_id}`} />
                        </div>
                    ))}
                </div>
                <button className="absolute right-0 bg-gradient-to-l from-color-dark to-transparent top-0 bottom-0 flex items-center justify-center" onClick={scrollRight}>
                    <ChevronRightIcon className="w-8 fill-color-white" />
                </button>
            </div>
        </>
    );
}

export default ProviderList;