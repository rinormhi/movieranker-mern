import { Fragment, useContext, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { sortData } from '../../../data/sort';
import { FilterContext } from '../../../context/FilterContext';


const Dropdown: React.FC<{ name: string }> = ({ name }) => {

    const { filter, setFilter } = useContext(FilterContext);

    const handleSortChange = (sortBy: string) => {
        setFilter({ ...filter, sortBy: sortBy });
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
                <Menu.Items className="absolute -left-1 z-10 mt-2 w-[300px] rounded-md bg-color-dark shadow-lg ring-1 ring-color-white ring-opacity-10 ">
                    <div className="w-full">
                        {sortData.map(sort =>
                            <Menu.Item key={sort.id}>
                                <>
                                    <span
                                        onClick={() => handleSortChange(sort.filter)}
                                        className={`block px-4 py-2 text-sm transition-all duration-200`}>
                                        {sort.name}
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