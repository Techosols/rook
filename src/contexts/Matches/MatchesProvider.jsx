import MatchesContext from "./MatchesContext";
import { useEffect, useState } from "react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import useAuth from "../../hooks/useAuth";

const MatchesProvider = ({ children }) => {
    const [loadingMatches, setLoadingMatches] = useState(false);
    
    const api = useAuthenticatedApi();
    const { token } = useAuth(); 


    const [blockedUsers, setBlockedUsers] = useState([]);
    const [ignoredUsers, setIgnoredUsers] = useState([]);
    const [bookmarkedByMeUsers, setBookmarkedByMeUsers] = useState([]);
    const [bookmarkedMeUsers, setBookmarkedMeUsers] = useState([]);
    const [profilesViewedByMe, setProfilesViewedByMe] = useState([]);
    const [profilesViewedMe, setProfilesViewedMe] = useState([]);
    const [connectionRequestsSent, setConnectionRequestsSent] = useState([]);
    const [connectionRequestsReceived, setConnectionRequestsReceived] = useState([]);
    const [connections, setConnections] = useState([]);
    const [matches, setMatches] = useState([]);
    const [randomMatches, setRandomMatches] = useState([]);
    const [bookmarkedByMeAcceptingConnections, setBookmarkedByMeAcceptingConnections] = useState([]);

    console.log('MatchesProvider States:', {
        blockedUsers,
        ignoredUsers,
        bookmarkedByMeUsers,
        bookmarkedMeUsers,
        profilesViewedByMe,
        profilesViewedMe,
        connectionRequestsSent,
        connectionRequestsReceived,
        connections,
        matches,
        randomMatches,
        bookmarkedByMeAcceptingConnections
    })

    useEffect(() => {
        // Only fetch when we have a valid API instance (token available)
        if (!api || !token) {
            return;
        }

        const fetchInitials = async () => {
            console.log('Fetching initial data...');
            setLoadingMatches(true);
            try {
                const [blockedUsersData, ignoredUsersData, bookmarkedByMeUsersData, bookmarkedMeUsersData, connectionRequestsSentData, connectionRequestsReceivedData, connectionsData, matchesData, randomMatchesData, bookmarkedByMeAcceptingConnectionsData] = await Promise.all([
                    api.get(`v1/query/GetUsersBlockedByYou`),
                    api.get(`v1/query/GetUsersIgnoredByYou`),
                    api.get(`v1/query/GetUsersBookmarkedByYou`),
                    api.get(`v1/query/GetUsersWhoBookmarkedYou`),
                    // Before Uncommenting add data states
                    // api.get(`v1/query/GetProfilesViewedByYou`), // ERROR was here
                    // api.get(`v1/query/GetUsersWhoViewedProfile`), // ERROR was here
                    api.get(`v1/query/GetConnectionRequestsByYou`),
                    api.get(`v1/query/GetConnectionRequestsToYou`),
                    api.get(`v1/query/GetYourConnections`),
                    api.get(`v1/query/GetYourMatches`),
                    api.get(`v1/query/GetYourRandomMatches`),
                    api.get(`v1/query/GetUsersBookmarkedByYouAcceptingConnections`),
                ]);
                setBlockedUsers(blockedUsersData.data ?? []);
                setIgnoredUsers(ignoredUsersData.data ?? []);
                setBookmarkedByMeUsers(bookmarkedByMeUsersData.data ?? []);
                setBookmarkedMeUsers(bookmarkedMeUsersData.data ?? []);
                // setProfilesViewedByMe(profilesViewedByMeData.data);
                // setProfilesViewedMe(profilesViewedMeData.data);
                setConnectionRequestsSent(connectionRequestsSentData.data ?? []);
                setConnectionRequestsReceived(connectionRequestsReceivedData.data ?? []);
                setConnections(connectionsData.data ?? []);
                setMatches(matchesData.data ?? []);
                setRandomMatches(randomMatchesData.data ?? []);
                setBookmarkedByMeAcceptingConnections(bookmarkedByMeAcceptingConnectionsData.data ?? []);
            } catch (error) {
                console.error('Error fetching initial matches data:', error);
            } finally {
                setLoadingMatches(false);
            }
        };

        fetchInitials();
    }, [token]);

    async function fetchBlockedUsers(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetUsersBlockedByYou`, {
            query: { page, oldestFirst  }
        });
        setBlockedUsers(response.data);
        return response.data;
    }

    async function fetchIgnoredUsers(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetUsersIgnoredByYou`, {
            query: { page, oldestFirst  }
        });
        setIgnoredUsers(response.data);
        return response.data;
    }

    async function fetchBookmarkedByMeUsers(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetUsersBookmarkedByYou`, {
            query: { page, oldestFirst  }
        });
        setBookmarkedByMeUsers(response.data);
        return response.data;
    }

    async function fetchBookmarkedMeUsers(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetUsersWhoBookmarkedYou`, {
            query: { page, oldestFirst  }
        });
        setBookmarkedMeUsers(response.data);
        return response.data;
    }

    async function fetchProfilesViewedByMe(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetProfilesViewedByYou`, {
            query: { page, oldestFirst  }
        });
        setProfilesViewedByMe(response.data);
        return response.data;
    }

    async function fetchProfilesViewedMe(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetUsersWhoViewedProfile`, {
            query: { page, oldestFirst  }
        });
        setProfilesViewedMe(response.data);
        return response.data;
    }

    async function fetchConnectionRequestsSent(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetConnectionRequestsByYou`, {
            query: { page, oldestFirst  }
        });
        setConnectionRequestsSent(response.data);
        return response.data;
    }

    async function fetchConnectionRequestsReceived(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetConnectionRequestsToYou`, {
            query: { page, oldestFirst  }
        });
        setConnectionRequestsReceived(response.data);
        return response.data;
    }

    async function fetchConnections(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetYourConnections`, {
            query: { page, oldestFirst  }
        });
        setConnections(response.data);
        return response.data;
    }

    async function fetchMatches(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetYourMatches`, {
            query: { page, oldestFirst  }
        });
        setMatches(response.data);
        return response.data;
    }

    async function fetchRandomMatches(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetYourRandomMatches`, {
            query: { page, oldestFirst  }
        });
        setRandomMatches(response.data);
        return response.data;
    }

    async function fetchBookmarkedByMeAcceptingConnections(page = 1, oldestFirst = false) {
        if (!api) {
            return;
        }
        const response = await api.get(`v1/query/GetUsersBookmarkedByYouAcceptingConnections`, {
            query: { page, oldestFirst  }
        });
        setBookmarkedByMeAcceptingConnections(response.data);
        return response.data;
    }

    const values = {
        loadingMatches,
        blockedUsers, setBlockedUsers,
        ignoredUsers, setIgnoredUsers,
        bookmarkedByMeUsers, setBookmarkedByMeUsers,
        bookmarkedMeUsers, setBookmarkedMeUsers,
        profilesViewedByMe, setProfilesViewedByMe,
        profilesViewedMe, setProfilesViewedMe,
        connectionRequestsSent, setConnectionRequestsSent,
        connectionRequestsReceived, setConnectionRequestsReceived,
        connections, setConnections,
        matches, setMatches,
        randomMatches, setRandomMatches,
        bookmarkedByMeAcceptingConnections, setBookmarkedByMeAcceptingConnections,
        fetchBlockedUsers,
        fetchIgnoredUsers,
        fetchBookmarkedByMeUsers,
        fetchBookmarkedMeUsers,
        fetchProfilesViewedByMe,
        fetchProfilesViewedMe,
        fetchConnectionRequestsSent,
        fetchConnectionRequestsReceived,
        fetchConnections,
        fetchMatches,
        fetchRandomMatches,
        fetchBookmarkedByMeAcceptingConnections,
    };

    return (
        <MatchesContext.Provider value={values}>
            {children}
        </MatchesContext.Provider>
    );
}

export default MatchesProvider;