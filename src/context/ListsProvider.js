import { createContext, useState } from 'react';

//create a context, with createContext api
export const listsContext = createContext();

const ListsProvider = (props) => { 
    // this state will be shared with all components 
    const [lists, setLists] = useState([]);

    return (
        // this is the provider providing state
        <listsContext.Provider value={[lists, setLists]}>
            {props.children}
        </listsContext.Provider>
    );
};

export default ListsProvider;