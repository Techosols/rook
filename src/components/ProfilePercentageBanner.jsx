import useModel from "../hooks/useModel";
import { useEffect, useState } from "react";
import PrivateApi from "../services/privateApi";
import useAuth from "../hooks/useAuth";

function ProfilePercentageBanner() {
    const { openModel } = useModel();
    const { token } = useAuth();
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        PrivateApi.get('/v1/profile-complete-stats')
        .then((res) => {
            const percent = res.data && (res.data["Total % Completed"] ?? 0);
            setProfileCompletion(Math.floor(percent));
        })
        .catch((err) => {
            console.error("Error fetching profile completion stats:", err);
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

    
    if(!token) {
        return;
    }


    return (
        <section className="relative bg-[url('../Images/bride-groom-their-wedding-ceremony.jpg')] bg-no-repeat bg-cover bg-[center_20%] bg-background dark:bg-background-dark text-text dark:text-text-dark px-4 py-10 ">
            {/* Top white gradient overlay - theme aware */}
            <div className="absolute inset-0 w-full h-full bg-white/80 dark:bg-black/60 pointer-events-none z-0"></div>
            {/* Bottom white gradient overlay - theme aware */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent dark:from-black dark:to-transparent pointer-events-none z-10"></div>
            <div className="container mx-auto flex md:justify-end justify-center items-center gap-10 relative z-10">
                {loading ? <div className="animate-pulse w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center border-2 border-black dark:border-white text-white"></div> : (
                    <div className='w-32 h-32 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center border-2 border-black dark:border-white text-white hover:cursor-pointer hover:scale-105 transition-transform duration-300' onClick={() => openModel({for: 'profilePercentage', heading: 'Profile Strength', dissmissible: true})}>
                        <p className='text-5xl'>{profileCompletion}%</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProfilePercentageBanner