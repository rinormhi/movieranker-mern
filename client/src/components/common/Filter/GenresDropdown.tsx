import { Fragment, useContext, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { genresData } from '../../../data/genres';
import { FilterContext } from '../../../context/FilterContext';


const Dropdown: React.FC<{ name: string }> = ({ name }) => {

    const { filter, setFilter } = useContext(FilterContext);

    const handleGenreChange = (id: string) => {
        if (filter.genres.length == 19) {
            const updatedGenres = filter.genres.filter((genre) => genre.id === id);
            setFilter({ ...filter, genres: updatedGenres });
        } else if (filter.genres.length == 1 && filter.genres.find((genre => genre.id === id))) {
            setFilter({ ...filter, genres: genresData });
        } else {
            const isGenreInFilter = filter.genres.find((genre) => genre.id === id);
            if (isGenreInFilter) {
                const updatedGenres = filter.genres.filter((genre) => genre.id !== id);
                setFilter({ ...filter, genres: updatedGenres });
            } else {
                const selectedGenre = genresData.find((genre) => genre.id === id);
                if (selectedGenre) {
                    setFilter({ ...filter, genres: [...filter.genres, selectedGenre] })
                }
            }
        }
    }
    
    return (
        <Menu as="div" className="inline-block text-left">
            <Menu.Button className="inline-flex gap-x-1.5 text-sm font-semibold">
                {name}
                <ChevronDownIcon className="w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute -left-1 z-10 mt-2 md:w-[800px] w-[400px] rounded-md bg-color-dark shadow-lg ring-1 ring-color-white ring-opacity-10 ">
                    <div className="flex flex-wrap w-full">
                        {genresData.map(genre =>
                            <Menu.Item key={genre.id}>
                                <>
                                    <span
                                        onClick={() => handleGenreChange(genre.id)}
                                        className={`w-1/2 md:w-1/4 block px-4 py-2 text-sm transition-all duration-200 ${filter.genres.find((selectedGenre) => selectedGenre.id === genre.id) ? 'text-color-white' : ''}`}>
                                        {genre.name}
                                    </span>
                                </>

                            </Menu.Item>
                        )}

                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}

export default Dropdown;