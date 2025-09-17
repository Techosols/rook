import createPrivateApi from "../services/privateApi";
import useAuth from "./useAuth";

const useAuthenticatedApi = () => {
    const { token } = useAuth();
    console.log("useAuthenticatedApi - token:", token);
    if (!token) {
        // Return null so consumers can handle unauthenticated state
        return null;
    }
    return createPrivateApi(token);
}

export default useAuthenticatedApi;