import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function RandomMatches({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Random matches" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default RandomMatches
