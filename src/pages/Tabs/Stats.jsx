import { useState } from "react";
import { MapPin, BarChart2 } from "lucide-react";

import Table from "../../components/Table";

function Stats() {

  const [search, setSearch] = useState("");
  const [statData, setStatData] = useState(null);
  const [nearbyStatsData, setNearByStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchedZip, setSearchZipcode] = useState(null)
  const [statsFound, setStatsFound] = useState(null);

  console.log('Exact Stat Data', statData)
  console.log('Nearby Stats Data: ', nearbyStatsData)

  const fetchStats = async (zipCode) => {
    setStatsFound(null);
    setLoading(true);
    try {
      const [exactRes, nearbyRes] = await Promise.all([
        fetch(`/api/fetch-data?endpoint=stats/zip/${zipCode}/scope/exact`),
        fetch(`/api/fetch-data?endpoint=stats/zip/${zipCode}/scope/withinradius`)
      ]);
      setStatData(exactRes.data);
      setNearByStatsData(nearbyRes.data);
      setSearchZipcode(search);
      // Check if all categories in both are empty
      const isEmpty = (obj) =>
        !obj || Object.values(obj).every(
          (cat) => !cat || Object.keys(cat).length === 0
        );
      if (isEmpty(exactRes.data) && isEmpty(nearbyRes.data)) {
        setStatsFound(false);
      } else {
        setStatsFound(true);
      }
    } catch (error) {
      console.error('ERR_STAT_RES', error);
      setStatsFound(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={`bg-background dark:bg-background-dark text-text dark:text-text-dark min-h-[60vh] py-6`}>
      <div className="container mx-auto max-w-5xl px-2 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 items-center mb-6">
          <MapPin className="mb-2 sm:mb-0" />
          <input
            type="text"
            className="appearance-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white w-full sm:w-80 md:w-96"
            placeholder="Search US based ZipCode"
            pattern="[0-9]*"
            maxLength={5}
            value={search}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, '');
              setSearch(onlyNums);
            }}
          />
          <button
            className="bg-primary dark:bg-primary-dark text-white p-2 rounded-lg hover:bg-secondary transition-colors duration-300 hover:cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto"
            onClick={() => fetchStats(search)}
            disabled={(loading || (search.length < 5))}
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 rounded-full border-t border-white disabled:bg-gray-500"></div>
            ) : 'Go'}
          </button>
        </div>

        {statsFound === null && !statData && !nearbyStatsData && (
          <div className="flex flex-col justify-center items-center min-h-[40vh] py-8">
            <BarChart2 className="w-16 h-16 text-primary mb-4" strokeWidth={1.5} />
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-50 mb-2">Discover Rook Community Stats</p>
            <p className="text-gray-500 text-center max-w-md">Curious about the diversity, backgrounds, and interests of Rook members in your area? Enter a US-based zip code above to explore real stats and get inspired to connect!</p>
          </div>
        )}
        {statsFound === false && (
          <div className="flex flex-col justify-center items-center min-h-[40vh] py-8">
            <BarChart2 className="w-16 h-16 text-gray-300 mb-4" strokeWidth={1.5} />
            <p className="text-lg font-semibold text-gray-500 mb-2">No stats found</p>
            <p className="text-gray-400">We could not find any stats for <span className="font-bold text-primary">{searchedZip}</span></p>
          </div>
        )}

        {(statData || nearbyStatsData) && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 p-0 md:p-2">
            {statData ? (
              <div className="p-0 md:p-2">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-xl font-bold mb-1">Stats for {searchedZip}</h3>
                  <p className="text-gray-400 mb-2">Here are some stats about Rook members in your area</p>
                </div>
                <div className="block space-y-4">
                  {statData && Object.entries(statData).map(([category, values]) => (
                    Object.keys(values).length > 0 && (
                      <div key={category} className="bg-white dark:bg-background-dark rounded-xl hover:shadow-md p-3 sm:p-4">
                        <h4 className="font-semibold text-base sm:text-lg capitalize text-start mb-2">By {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                        <Table col1={category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} col2={"Members"} data={Object.entries(values)} />
                      </div>
                    )
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="w-full">
                  We could not find any members in your exact ZIP code. See right panel for stats around your ZIP code.
                </p>
              </div>
            )}
            {nearbyStatsData ? (
              <div className="p-0 md:p-2">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-xl font-bold mb-1">Stats for 25 miles around {searchedZip}</h3>
                  <p className="text-gray-400 mb-2">Here are some stats about Rook members around your area</p>
                </div>
                <div className="block space-y-4">
                  {Object.entries(nearbyStatsData).map(([category, values]) => (
                    Object.keys(values).length > 0 && (
                      <div key={category} className="bg-white dark:bg-background-dark rounded-xl hover:shadow-md p-3 sm:p-4">
                        <h4 className="font-semibold text-base sm:text-lg capitalize text-start mb-2">By {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                        <Table col1={category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} col2={"Members"} data={Object.entries(values)} />
                      </div>
                    )
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p className="w-full">
                  Sorry! we could not find nearby stats for you
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Stats;
