import { createContext, useState } from 'react';

//create a context, with createContext api
export const themeContext = createContext();

const ThemeProvider = (props) => { 
    // this state will be shared with all components 
    const [theme, setTheme] = useState('light');

    return (
        // this is the provider providing state
        <themeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </themeContext.Provider>
    );
};

export default ThemeProvider;