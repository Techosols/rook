import {createContext} from 'react';

const TabContext = createContext({
    activeTab: null,
    setActiveTab: () => {},
    tabs: [],

});

export default TabContext;