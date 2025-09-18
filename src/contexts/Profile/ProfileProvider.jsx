import ProfileContext from "./ProfileContext";
import { useState, useEffect } from "react";
import PrivateApi from "../../services/privateApi";
import useAuth from "../../hooks/useAuth";
import useAuthenticatedApi from "../../hooks/useAuthenticatedAPi";
import { useAuth0 } from "@auth0/auth0-react";

function ProfileProvider({ children }) {
    const { token } = useAuth();
    const { isAuthenticated } = useAuth0();
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isProfileUpdating, setIsProfileUpdating] = useState(false);
    const [profileError, setProfileError] = useState(null);
    const [physicalActivity, setPhysicalActivty] = useState([]);

    const api = useAuthenticatedApi();

    /*
    console.log("Profile State:", {
        profile,
        isProfileLoading,
        isProfileUpdating,
        profileError
    });
    */

    function setProfileField(field, value) {
        setProfile((prevProfile) => ({
            ...prevProfile,
            [field]: value
        }));
    }

    function updateProfile(updates) {
        setProfile((prevProfile) => ({
            ...prevProfile,
            ...updates
        }));
    }

    useEffect(() => {
        if (!token) return;

        const fetchAll = async () => {
            try {
                setIsProfileLoading(true);
                const [profileRes, activityRes] = await Promise.all([
                    api.get("V1/profile"),
                    api.get("V1/physical-activity")
                    
                ]);
                setProfile(profileRes.data);
                setPhysicalActivty(activityRes.data);
            } catch (error) {
                console.error("Error fetching profile or activity:", error);
                setProfileError(error);
            } finally {
                setIsProfileLoading(false);
            }
        };

        if(isAuthenticated) {
            fetchAll();
        }
    }, [token, isAuthenticated]);


    return (
        <ProfileContext.Provider value={{
            profile,
            isProfileLoading,
            isProfileUpdating,
            profileError,
            setProfile,
            setIsProfileLoading,
            setIsProfileUpdating,
            setProfileError,
            setProfileField,
            updateProfile,
            physicalActivity,
        
        }}>
            {children}
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;