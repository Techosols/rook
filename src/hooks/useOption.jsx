import OptionContext from "../contexts/Options/OptionContext";
import { useContext } from "react";

const useOption = () => {
    const context = useContext(OptionContext);
    if (!context) {
        throw new Error("useOption must be used within an OptionProvider");
    }
    return context;
}

export default useOption;