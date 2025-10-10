import MatchesContainer from "../ui/MatchesContainer"
import useMatches from "../../hooks/useMatches"

function Connections({connectionsData}) {

  const { loadingMatches } = useMatches()
  return (
    <MatchesContainer title="Connections" data={connectionsData} isLoadingMatches={loadingMatches} />
  )
}

export default Connections
