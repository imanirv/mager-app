import {useState, Fragment} from "react"
import { Combobox, Transition } from '@headlessui/react'
import {  CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function ComboboxItem({data, placeholder, onChange, title,  name, id, defaultVal }) {
    const [selected, setSelected] = useState({name:""})
    const [query, setQuery] = useState('')

    const filteredData =
        query === ''
        ? data
        : data.filter((searched) =>
            searched.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    
    const handleChange = (value) => {
        setSelected(value);
        onChange(value);
    }

    return (
        <Combobox value={selected} onChange={(val) => handleChange(val)}>
            <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md  sm:text-sm">
                <Combobox.Input
                className="w-full border-none p-3 pr-10 text-sm leading-5 bg-darkmode-3 text-white outline-none capitalize"
                displayValue={(data) => defaultVal ? defaultVal : data.name}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
                </Combobox.Button>
            </div>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
            >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-darkmode-3 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {filteredData.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-white">
                    Nothing found.
                    </div>
                ) : (
                    filteredData.map((item) => (
                    <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 `
                        }
                        value={item}
                    >
                        {({ selected, active }) => (
                        <>
                            <span
                            className={`block truncate capitalize ${
                                selected ? 'font-medium' : 'font-normal'
                            }`}
                            >
                            {item.name}
                            </span>
                            {selected ? (
                            <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                                }`}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            ) : null}
                        </>
                        )}
                    </Combobox.Option>
                    ))
                )}
                </Combobox.Options>
            </Transition>
            </div>
        </Combobox>
    )
  }
  const SelectInput = ({data, placeholder, onChange, title,  name, id, defaultVal}) => {
      return(
        <div className="mb-3">
            <div className="bg-darkmode-3 w-full rounded-lg text-white font-nunito font-bold">
                <ComboboxItem data={data} placeholder={placeholder} onChange={onChange}  name={name} id={id} />
            </div> 
        </div>
      )
  }


  export default SelectInput