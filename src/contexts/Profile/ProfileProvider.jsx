import ProfileContext from "./ProfileContext";
import { useState, useEffect } from "react";
import PrivateApi from "../../services/privateApi";

function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isProfileUpdating, setIsProfileUpdating] = useState(false);
    const [profileError, setProfileError] = useState(null);

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
        const fetchProfile = async () => {
            try {
                setIsProfileLoading(true);
                const response = await PrivateApi.get("V1/profile");
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsProfileLoading(false);
            }
        };

        fetchProfile();
    }, []);


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
            updateProfile
        }}>
            {children}
        </ProfileContext.Provider>
    );
}

export default ProfileProvider;