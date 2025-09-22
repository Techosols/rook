import createFileServiceApi from "../services/fileServiceApi"
import useAuth from "./useAuth";

const useFileServiceApi = () => {
    const { token } = useAuth();
    if (!token) {
        // Return null so consumers can handle unauthenticated state
        return null;
    }
    return createFileServiceApi(token);
}

export default useFileServiceApi;