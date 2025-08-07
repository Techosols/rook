import TabContext from "../contexts/Tab/TabContext";
import { useContext } from "react";

const useTab = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTab must be used within a TabProvider");
    }
    return context;
}

export default useTab;
