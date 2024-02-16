import { Dispatch, SetStateAction } from "react";
import { Filter } from "../interfaces/Filter";

export interface FilterContextProps {
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
    resetFilter: () => void;
}