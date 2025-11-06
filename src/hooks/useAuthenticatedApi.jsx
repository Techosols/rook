import { useMemo } from "react";
import createPrivateApi from "../services/privateApi";
import useAuth from "./useAuth";

const useAuthenticatedApi = () => {
  const { token } = useAuth();

  const api = useMemo(() => {
    if (!token) return null;
    return createPrivateApi(token);
  }, [token]); 

  return api;
};

export default useAuthenticatedApi;
