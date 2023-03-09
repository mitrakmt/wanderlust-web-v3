import { createContext, useState } from 'react';

//create a context, with createContext api
export const toastsContext = createContext();

const ToastsProvider = (props) => { 
    // this state will be shared with all components 
    const [toasts, setToasts] = useState([]);

    return (
        // this is the provider providing state
        <toastsContext.Provider value={[toasts, setToasts]}>
            {props.children}
        </toastsContext.Provider>
    );
};

export default ToastsProvider;