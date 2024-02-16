import { createContext, useState } from "react";
import { FilterContextProps } from "../interfaces/FilterContextProps";
import { FilterProviderProps } from "../interfaces/FilterProviderProps";
import { Filter } from "../interfaces/Filter";
import { genresData } from "../data/genres";
import { watchProviderData } from "../data/watchprovider";

export const FilterContext = createContext<FilterContextProps>({} as FilterContextProps);

const getInitialFilter = (): Filter => ({
    genres: genresData,
    watchProviders: watchProviderData,
    sortBy: "popularity.desc",
    page: 1
});

const FilterProvider = ({ children }: FilterProviderProps) => {

    const [filter, setFilter] = useState(getInitialFilter);
    const resetFilter = () => {
        setFilter(getInitialFilter());
    }

    return (
        <FilterContext.Provider value={{
            filter, setFilter, resetFilter
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export default FilterProvider;