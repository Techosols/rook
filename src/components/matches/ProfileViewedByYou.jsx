import useMatches from "../../hooks/useMatches";
import MatchesContainer from "../ui/MatchesContainer";

function ProfileViewedByYou({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Profiles" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default ProfileViewedByYou
