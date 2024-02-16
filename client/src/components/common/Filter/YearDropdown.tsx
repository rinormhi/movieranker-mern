import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import RangeSlider from './RangeSlider';

const Dropdown: React.FC<{ name: string }> = ({ name }) => {
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
                    <Menu.Item>
                        <>
                            <RangeSlider></RangeSlider>
                        </>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}

export default Dropdown;