import { useContext, useState } from 'react';
import ProviderList from "./ProviderList";
import { FilterContext } from '../../../context/FilterContext';
import FilterMenu from './FilterMenu';

const FilterComponent = () => {

    const { resetFilter } = useContext(FilterContext);

    const reset = () => {
        resetFilter();
    }

    return (
        <>
            <ProviderList />
            <div className="relative filter-options mt-4 flex gap-8 justify-between text-color-dark-white items-center">
                <FilterMenu />
                <div onClick={reset} className="resetOption text-color-link hover:text-color-link-hover cursor-pointer flex text-sm items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 color-dark-grey">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    ZURÜCKSETZEN
                </div>
            </div>
        </>
    );
}

export default FilterComponent;