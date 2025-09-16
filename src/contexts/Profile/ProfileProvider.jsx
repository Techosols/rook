import ProfileContext from "./ProfileContext";
import { useState, useEffect } from "react";
import PrivateApi from "../../services/privateApi";
import useAuth from "../../hooks/useAuth";

function ProfileProvider({ children }) {
    const { token } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isProfileUpdating, setIsProfileUpdating] = useState(false);
    const [profileError, setProfileError] = useState(null);
    const [physicalActivity, setPhysicalActivty] = useState([]);

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
                    PrivateApi.get("V1/profile"),
                    PrivateApi.get("V1/physical-activity")
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

        fetchAll();
    }, [token]);


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