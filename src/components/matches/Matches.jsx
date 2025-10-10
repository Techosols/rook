import MatchesContainer from '../ui/MatchesContainer'
import useMatches from '../../hooks/useMatches';

function Match({ matchesData }) {
  const { loadingMatches } = useMatches();

  return (  
    <MatchesContainer title="Your Matches" data={matchesData} isLoadingMatches={loadingMatches}></MatchesContainer>
  )
}

export default Match
