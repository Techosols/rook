import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function BookmarkedByYouAcceptingConnections({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Bookmarked - Accepting Connections" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default BookmarkedByYouAcceptingConnections
