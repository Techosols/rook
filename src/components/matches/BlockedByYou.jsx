import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function BlockedByYou({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Blocked" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default BlockedByYou
