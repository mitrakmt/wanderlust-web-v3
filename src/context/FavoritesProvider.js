import { createContext, useState } from 'react';

//create a context, with createContext api
export const favoritesContext = createContext();

const FavoritesProvider = (props) => {
    // this state will be shared with all components 
    const [favorites, setFavorites] = useState([]);

    return (
        // this is the provider providing state
        <favoritesContext.Provider value={[favorites, setFavorites]}>
            {props.children}
        </favoritesContext.Provider>
    );
};

export default FavoritesProvider;