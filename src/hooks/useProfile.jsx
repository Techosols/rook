import ProfileContext from "../contexts/Profile/ProfileContext";
import { useContext } from "react";

const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
}

export default useProfile;