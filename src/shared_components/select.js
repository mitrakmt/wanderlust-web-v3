import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Select({ data, select, selected, label, imagePropertyName, setChanged }) {
    const onChange = (item) => {
        select(item);
        setChanged();
    }
  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{label}</Listbox.Label>
          <div className="relative mt-1">

          {/* <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</label>
            <select id="countries" onChange={onChange} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> */}



            <Listbox.Button className="relative w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <span className="flex items-center">
                {
                    imagePropertyName && (
                        <p className="flex-shrink-0 w-6 h-6 rounded-full bg-white-700">{selected[imagePropertyName]}</p>
                    )
                }
                <span className="block ml-3 text-white truncate">{selected.name}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <SelectorIcon className="w-5 h-5 dark:text-white" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-gray-900 border-gray-700 rounded-md shadow-lg dark:text-white max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item) => (
                  <Listbox.Option
                    key={`select-label-${item.id}`}
                    className={({ active }) =>
                      classNames(
                        active ? 'dark:text-white bg-indigo-600' : 'dark:text-white',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                            {
                                imagePropertyName && (
                                    <p className="flex-shrink-0 w-6 h-6 rounded-full">{item[imagePropertyName]}</p>
                                )
                            }
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'dark:text-white' : 'dark:text-white',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}