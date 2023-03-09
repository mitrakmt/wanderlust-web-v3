import { createContext, useState } from 'react';

//create a context, with createContext api
export const selectedCityContext = createContext();

const SelectedCityProvider = (props) => { 
    // this state will be shared with all components 
    const [selectedCity, setSelectedCity] = useState({});

    return (
        // this is the provider providing state
        <selectedCityContext.Provider value={[selectedCity, setSelectedCity]}>
            {props.children}
        </selectedCityContext.Provider>
    );
};

export default SelectedCityProvider;