import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function WhoViewedProfile({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Profile Viewers" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default WhoViewedProfile
