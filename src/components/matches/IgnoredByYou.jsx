import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function IgnoredByYou({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Ignored" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default IgnoredByYou
