import { useState } from "react";
import TabContext from "./TabContext";

const TabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('background');

    const tabs = ['background', 'pricing', 'filter', 'pictures', 'community', 'stats', 'join'];

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab, tabs }}>
            {children}
        </TabContext.Provider>
    );
}

export default TabProvider;
