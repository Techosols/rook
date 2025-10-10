import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function WhoBookmarkedYou({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Bookmarked You" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default WhoBookmarkedYou
