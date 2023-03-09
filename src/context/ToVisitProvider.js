import { createContext, useState } from 'react';

//create a context, with createContext api
export const toVisitContext = createContext();

const ToVisitProvider = (props) => { 
    // this state will be shared with all components 
    const [toVisit, setToVisit] = useState([]);

    return (
        // this is the provider providing state
        <toVisitContext.Provider value={[toVisit, setToVisit]}>
            {props.children}
        </toVisitContext.Provider>
    );
};

export default ToVisitProvider;