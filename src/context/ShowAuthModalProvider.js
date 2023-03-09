import { createContext, useState } from 'react';

//create a context, with createContext api
export const showAuthModalContext = createContext();

const ShowAuthModalProvider = (props) => { 
    // this state will be shared with all components 
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        // this is the provider providing state
        <showAuthModalContext.Provider value={[showAuthModal, setShowAuthModal]}>
            {props.children}
        </showAuthModalContext.Provider>
    );
};

export default ShowAuthModalProvider;