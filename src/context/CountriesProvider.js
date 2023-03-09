import { createContext, useState } from 'react';

//create a context, with createContext api
export const countriesContext = createContext();

const CountriesProvider = (props) => { 
    // this state will be shared with all components 
    const [countries, setCountries] = useState([]);

    return (
        // this is the provider providing state
        <countriesContext.Provider value={[countries, setCountries]}>
            {props.children}
        </countriesContext.Provider>
    );
};

export default CountriesProvider;