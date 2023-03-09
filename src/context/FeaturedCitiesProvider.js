import { createContext, useState } from 'react';

//create a context, with createContext api
export const featuredCitiesContext = createContext();

const FeaturedCitiesProvider = (props) => {
    // this state will be shared with all components 
    const [featuredCities, setFeaturedCities] = useState([]);

    return (
        // this is the provider providing state
        <featuredCitiesContext.Provider value={[featuredCities, setFeaturedCities]}>
            {props.children}
        </featuredCitiesContext.Provider>
    );
};

export default FeaturedCitiesProvider;