import React, { useState, useEffect } from "react";
import Select from "./Select";
import {
  Heart,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Send,
  Inbox,
  Bookmark,
  Star,
  User,
  Eye,
  UserMinus,
  BellOff,
  Shuffle,
  Info,
} from "lucide-react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import ProfileCard from "./ProfileCard";

function MatchesContainer({
  title = "Matches",
  data,
  endPoint = "GetYourMatches",
  isLoadingMatches = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const api = useAuthenticatedApi();
  const [uiData, setUiData] = useState(data || null);
  const totalPages = uiData?.totalPages || 1;
  const [search, setSearch] = useState("");
  const [toggleInfo, setToggleInfo] = useState(false);
  const suggestions = [
    "About Me",
    "Convo Starters",
    "Hobbies",
    "Music Genres",
    "Musical Instruments",
    "Occupation",
    "Pets",
    "Sport Interests",
  ];

  // Update uiData when data prop changes
  useEffect(() => {
    if (data) {
      setUiData(data);
      setCurrentPage(1); // Reset to page 1 when new data is provided
    }
  }, [data]);

  const handleToggleInfo = () => {
    setToggleInfo(!toggleInfo);
  };

  const fetchPage = async (page) => {
    if (!api) return;
    setFetching(true);
    try {
      const response = await api.get(`v1/query/${endPoint}?page=${page}`);
      setUiData(response.data);
      setCurrentPage(page); // Update current page after successful fetch
    } catch (error) {
      console.error("❌ Error fetching page:", error);
    } finally {
      setFetching(false);
    }
  };

  // Normalize results and perform a safe, case-insensitive filter.
  const results = uiData?.results || [];
  const normalizedSearch = (search || "").trim().toLowerCase();

  const filteredData = normalizedSearch
    ? results.filter((val) => {
        const name = (val?.preferredName || val?.prefferedName || "")
          .toString()
          .toLowerCase();
        return name.includes(normalizedSearch);
      })
    : results;

  // console.log('🔴 Current UI Data:', {
  //     page: currentPage,
  //     totalPages: uiData?.totalPages,
  //     resultsCount: uiData?.results?.length,
  //     uiData: uiData
  // });

  // determine whether we have any results to show
  const hasResults =
    Array.isArray(uiData?.results) && uiData.results.length > 0;

  // title-specific no-data content mapping
  const noDataMap = (() => {
    const key = (title || "").toString().toLowerCase();
    if (key.includes("match"))
      return {
        icon: <Heart className="w-12 h-12 text-pink-500" />,
        headline: "No matches yet",
        description:
          "We haven't found any matches for your preferences. Try broadening your filters to see more people.",
        primary: {
          label: "Adjust filters",
          action: () => {
            /* todo: open filters */
          },
        },
      };
    if (key.includes("connection"))
      return {
        icon: <Users className="w-12 h-12 text-indigo-500" />,
        headline: "No connections",
        description:
          "You don't have any connections yet. Send someone a connection request to get started.",
        primary: { label: "Browse profiles", action: () => fetchPage(1) },
      };
    if (key.includes("bookmarked"))
      return {
        icon: <Bookmark className="w-12 h-12 text-amber-500" />,
        headline: "No bookmarks",
        description:
          "You haven't bookmarked any profiles. Bookmark interesting people to find them later.",
        primary: { label: "Explore profiles", action: () => fetchPage(1) },
      };
    if (key.includes("profile") || key.includes("profiles"))
      return {
        icon: <User className="w-12 h-12 text-green-500" />,
        headline: "No profiles found",
        description:
          "There are no profiles matching this view. Try removing filters or searching for a different area.",
        primary: { label: "Clear filters", action: () => setSearch("") },
      };
    if (key.includes("blocked"))
      return {
        icon: <UserMinus className="w-12 h-12 text-red-500" />,
        headline: "No blocked profiles",
        description:
          "You haven't blocked anyone yet. Block profiles from a profile card if needed.",
        primary: { label: "Browse profiles", action: () => fetchPage(1) },
      };
    if (key.includes("ignored"))
      return {
        icon: <BellOff className="w-12 h-12 text-gray-500" />,
        headline: "No ignored profiles",
        description:
          "You haven't ignored any profiles. Use ignore to remove profiles from suggestions.",
        primary: { label: "Explore suggestions", action: () => fetchPage(1) },
      };
    if (key.includes("random"))
      return {
        icon: <Shuffle className="w-12 h-12 text-purple-500" />,
        headline: "No random picks",
        description:
          "There are no random profiles right now. Try again later or broaden your search.",
        primary: { label: "Try again", action: () => fetchPage(1) },
      };

    // default
    return {
      icon: <Sparkles className="w-12 h-12 text-pink-500" />,
      headline: "No results",
      description:
        "We couldn't find anything for this view. Try adjusting filters or come back later.",
      primary: { label: "Reload", action: () => fetchPage(1) },
    };
  })();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      {/* Header Section - only show when there's data or when loading */}
      {(isLoadingMatches || hasResults) && (
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Title with Icon */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                {(() => {
                  const key = (title || "").toString().toLowerCase();
                  if (key.includes("match"))
                    return <Heart className="w-7 h-7 text-white" />;
                  if (key.includes("connection") && key.includes("sent"))
                    return <Send className="w-7 h-7 text-white" />;
                  if (key.includes("connection") && key.includes("received"))
                    return <Inbox className="w-7 h-7 text-white" />;
                  if (key === "connections" || key.includes("connection"))
                    return <Users className="w-7 h-7 text-white" />;
                  if (key.includes("bookmarked") && key.includes("accept"))
                    return <Star className="w-7 h-7 text-white" />;
                  if (key.includes("bookmarked"))
                    return <Bookmark className="w-7 h-7 text-white" />;
                  if (key.includes("profile") && key.includes("view"))
                    return <Eye className="w-7 h-7 text-white" />;
                  if (key.includes("profiles"))
                    return <User className="w-7 h-7 text-white" />;
                  if (key.includes("blocked"))
                    return <UserMinus className="w-7 h-7 text-white" />;
                  if (key.includes("ignored"))
                    return <BellOff className="w-7 h-7 text-white" />;
                  if (key.includes("random"))
                    return <Shuffle className="w-7 h-7 text-white" />;
                  return <Heart className="w-7 h-7 text-white" />;
                })()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  {title}
                </h2>
                <p className="text-white/80 text-sm">
                  Find your perfect connection
                </p>
              </div>
            </div>
            <div className="relative flex items-center space-x-2">
              <input
                type="text"
                placeholder={`Search ${title}`}
                className="bg-white dark:bg-gray-800 p-3 rounded-xl w-72 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Info Button */}
              <button
                onClick={handleToggleInfo}
                className="cursor-pointer relative z-10"
              >
                <Info color="white" />
              </button>

              {/* Tooltip / Dropdown */}
              {toggleInfo && (
                <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 p-4 rounded-xl w-64 shadow-lg border border-gray-200/50 dark:border-gray-700/50 z-20">
                  <p className="mb-2 text-sm">Results based on your search:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                    {suggestions.map((item) => (
                      <li key={item}><button className="cursor-pointer hover:text-primary">{item}</button></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {/* {uiData && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search matches..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>
            )} */}

      {/* Content Section */}
      <div className="p-6">
        {isLoadingMatches ? (
          <div className="space-y-6">
            {/* Header skeleton */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3 animate-pulse"></div>

            {/* Card skeletons */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : hasResults ? (
          <>
            <div className="space-y-4">
              {filteredData.map((match) => (
                <ProfileCard key={match.profileId} profile={match} />
              ))}
            </div>
          </>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 h-full">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/40">
              {noDataMap.icon}
            </div>

            <div className="max-w-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {noDataMap.headline}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {noDataMap.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Section - only show when there's at least one result */}
      {hasResults && (
        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {/* Page Info */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <div className="h-1 w-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const prevPage = Math.max(1, currentPage - 1);
                  if (prevPage !== currentPage) {
                    fetchPage(prevPage);
                  }
                }}
                disabled={currentPage === 1 || fetching || isLoadingMatches}
                className="group flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {fetching || isLoadingMatches ? "Loading..." : "Previous"}
                </span>
              </button>

              <button
                onClick={() => {
                  const nextPage = Math.min(totalPages, currentPage + 1);
                  if (nextPage !== currentPage) {
                    fetchPage(nextPage);
                  }
                }}
                disabled={
                  currentPage === totalPages || fetching || isLoadingMatches
                }
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="text-sm font-medium">
                  {fetching || isLoadingMatches ? "Loading..." : "Next"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchesContainer;
