import { useContext } from "react";
import MatchesContext from "../contexts/Matches/MatchesContext";

const useMatches = () => {
  const context = useContext(MatchesContext);
  if (!context) {
    throw new Error("useMatches must be used within a MatchesProvider");
  }
  return context;
};

export default useMatches;