
import useMatches from '../../hooks/useMatches'
import MatchesContainer from '../ui/MatchesContainer'

function ConnectionRequestsByYou({data}) {
  const { loadingMatches } = useMatches();
  return (
    <MatchesContainer title="Connection Requests - Sent" data={data} isLoadingMatches={loadingMatches} />
  )
}

export default ConnectionRequestsByYou
