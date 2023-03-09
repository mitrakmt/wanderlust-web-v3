import { createContext, useState } from 'react';

//create a context, with createContext api
export const communityContext = createContext();

const CommunityProvider = (props) => {
    // this state will be shared with all components 
    const [community, setCommunity] = useState([]);

    return (
        // this is the provider providing state
        <communityContext.Provider value={[community, setCommunity]}>
            {props.children}
        </communityContext.Provider>
    );
};

export default CommunityProvider;