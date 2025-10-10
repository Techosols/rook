import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function BookmarkedByYou({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Bookmarked By You" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default BookmarkedByYou
