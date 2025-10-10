import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function ConnectionRequestToYou({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Connection Requests - Received" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default ConnectionRequestToYou
