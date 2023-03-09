import { createContext, useState } from 'react';

//create a context, with createContext api
export const followersContext = createContext();

const FollowersProvider = (props) => { 
    // this state will be shared with all components 
    const [followers, setFollowers] = useState([]);

    return (
        // this is the provider providing state
        <followersContext.Provider value={[followers, setFollowers]}>
            {props.children}
        </followersContext.Provider>
    );
};

export default FollowersProvider;