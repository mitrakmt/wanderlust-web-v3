import { createContext, useState } from 'react';

//create a context, with createContext api
export const followsContext = createContext();

const FollowsProvider = (props) => { 
    // this state will be shared with all components 
    const [follows, setFollows] = useState([]);

    return (
        // this is the provider providing state
        <followsContext.Provider value={[follows, setFollows]}>
            {props.children}
        </followsContext.Provider>
    );
};

export default FollowsProvider;