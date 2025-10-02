import createPrivateApi from "../services/privateApi";
import useAuth from "./useAuth";

const useAuthenticatedApi = () => {
    const { token } = useAuth();
    if (!token) {
        // Return null so consumers can handle unauthenticated state
        console.warn("No auth token available, returning null API instance.");
        return null;
    }
    return createPrivateApi(token);
}

export default useAuthenticatedApi;