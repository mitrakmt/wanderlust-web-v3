import { createContext, useState } from 'react';

//create a context, with createContext api
export const followingContext = createContext();

const FollowingProvider = (props) => { 
    // this state will be shared with all components 
    const [following, setFollowing] = useState([]);

    return (
        // this is the provider providing state
        <followingContext.Provider value={[following, setFollowing]}>
            {props.children}
        </followingContext.Provider>
    );
};

export default FollowingProvider;