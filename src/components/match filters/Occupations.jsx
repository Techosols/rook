import { LucideBadgeInfo, TriangleAlert } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"
import Input from "../ui/Input"

import { useState } from "react"

import useFilter from "../../hooks/useFilter";

function Occupations() {

  const [searchInclude, setSearchInclude] = useState("");
  const [searchExclude, setSearchExclude] = useState("");

  const {
    mergedExcludedOccupations,
    mergedIncludedOccupations,
    UpdateIncludedOccupation,
    saveIncludedOccupation,
    UpdateExcludedOccupation,
    isSavingIncludedOccupations,
    isSavingExcludedOccupations,
    saveExcludedOccupation,
    isLoading
  } = useFilter();

  const isIncludeLoading = isLoading || Object.keys(mergedIncludedOccupations || {}).length === 0;
  const isExcludeLoading = isLoading || Object.keys(mergedExcludedOccupations || {}).length === 0;

  const filteredIncludeOccupations = Object.values(mergedIncludedOccupations).filter((occupation) =>
    occupation?.name.toLowerCase().startsWith(searchInclude.toLowerCase())
  );

  const filteredExcludeOccupations = Object.values(mergedExcludedOccupations).filter((occupation) =>
    occupation?.name.toLowerCase().startsWith(searchExclude.toLowerCase())
  );
  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      
      {/* INCLUDED */}
      <FormSection
        title="Included Occupations"
        disabled={isLoading}
        onSave={() => saveIncludedOccupation()}
        loading={isSavingIncludedOccupations}
      >
        <div className="flex flex-col gap-1 md:gap-2 border-l-4 border-yellow-500 pl-2 bg-yellow-50 dark:bg-yellow-100 p-1">
          <div className="flex items-center gap-1 ">
            <TriangleAlert className="text-yellow-500 " />
            <p className="text-yellow-600 font-bold">Warning:</p>
          </div>
          <p className="text-yellow-600 text-sm">
            Use this section with caution. If you include some occupations, Rook will include ONLY people in those occupations.
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          <LucideBadgeInfo className="inline-block mr-1" />
          Check off all options you want to include.
        </p>

        {/* Search Input */}
        <div className="relative">
         {isIncludeLoading ? (
            <div className="flex flex-col gap-2">
              <div className="w-full h-8 bg-gray-300 animate-pulse"></div>
            </div>
          ) : (
            <Input
              type="text"
              placeholder="Search occupations to include..."
              value={searchInclude}
              onChange={(e) => setSearchInclude(e.target.value)}
              className="w-96"
            />

          )}

          {/* Dropdown */}
          {searchInclude.length > 0 && filteredIncludeOccupations.length > 0 && (
            <div className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md absolute z-10 w-full">
              {filteredIncludeOccupations.map((occupation) => (
                <>
                <div
                  key={occupation.id}
                  onClick={() => {
                    UpdateIncludedOccupation(occupation.id);
                    setSearchInclude(""); // clear field
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {(() => {
                    const name = occupation?.name || "";
                    const search = searchInclude;
                    if (!search) return name;
                    const regex = new RegExp(`(${search})`, "gi");
                    const parts = name.split(regex);
                    return parts.map((part, i) =>
                      regex.test(part) ? <b key={i}>{part}</b> : part
                    );
                  })()}
                </div>
                </>
              ))}
            </div>
          )}
        </div>

        {/* Checkbox List */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">

          {isIncludeLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}
       {!isIncludeLoading && Object.values(mergedIncludedOccupations).filter((occupation) => !occupation.excluded).map((occ) => (
        <Checkbox key={occ?.id} label={occ?.name} checked={!occ?.excluded} onChange={() => UpdateIncludedOccupation(occ?.id)} />
      ))}
      </div>

      </FormSection>


      {/* EXCLUDED */}
      <FormSection
        title="Excluded Occupations"
        disabled={isLoading}
        onSave={() => saveExcludedOccupation()}
        loading={isSavingExcludedOccupations}
      >
        <div className="flex flex-col gap-1 md:gap-2 border-l-4 border-yellow-500 dark:bg-yellow-100 pl-2 bg-yellow-50 p-1">
          <div className="flex items-center gap-1">
            <TriangleAlert className="text-yellow-500" />
            <p className="text-yellow-600 font-bold">Warning:</p>
          </div>
          <p className="text-yellow-600 text-sm">
            If you exclude an occupation, Rook will exclude ALL people in that occupation.
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          <LucideBadgeInfo className="inline-block mr-1" />
          Check off all options you want to exclude.
        </p>

        {/* Search Input */}
        <div className="relative">
          {isExcludeLoading ? (
            <div className="flex flex-col gap-2">
              <div className="w-full h-8 bg-gray-300 animate-pulse"></div>
            </div>
          ) : (
            <Input
              type="text"
              placeholder="Search occupations to exclude..."
              value={searchExclude}
              onChange={(e) => setSearchExclude(e.target.value)}
              className="w-96"
            />
          )}

          {/* Dropdown for excluded */}
          {searchExclude.length > 0 && filteredExcludeOccupations.length > 0 && (
            <div className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md absolute z-10 w-full">
              {filteredExcludeOccupations.map((occupation) => (
                <div
                  key={occupation.id}
                  onClick={() => {
                    UpdateExcludedOccupation(occupation.id);
                    setSearchExclude("");
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {(() => {
                    const name = occupation?.name || "";
                    const search = searchExclude;
                    if (!search) return name;
                    const regex = new RegExp(`(${search})`, "gi");
                    const parts = name.split(regex);
                    return parts.map((part, i) =>
                      regex.test(part) ? <b key={i}>{part}</b> : part
                    );
                  })()}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {isExcludeLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}

          {/* {!isExcludeLoading &&
            Object.values(mergedExcludedOccupations).map((occupation) => (
              <Checkbox
                key={occupation?.id}
                label={occupation?.name}
                checked={occupation?.excluded}
                onChange={() => UpdateExcludedOccupation(occupation?.id)}
              />
            ))} */}
            {!isExcludeLoading && Object.values(mergedExcludedOccupations).filter((occupation) => occupation.excluded).map((occ) => (
            <Checkbox key={occ?.id} label={occ?.name} checked={occ?.excluded} onChange={() => UpdateExcludedOccupation(occ?.id)} />
          ))}
        </div>

      </FormSection>

    </div>
  );
}

export default Occupations;
