import { LucideBadgeInfo, TriangleAlert } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"
import Input from "../ui/Input"

import { useState } from "react"


function Occupations() {

  const [searchInclude, setSearchInclude] = useState("");
  const [searchExclude, setSearchExclude] = useState("");

  const occupations = [
    "Healthcare",
    "Education",
    "Technology",
    "Finance",
    "Arts & Entertainment",
    "Law Enforcement",
    "Military",
    "Hospitality",
    "Retail",
    "Construction",
    "Transportation",
    "Manufacturing",
  ];

  const includeOccupations = occupations.filter((occupation) =>
    occupation.toLowerCase().includes(searchInclude.toLowerCase())
  );

  const excludeOccupations = occupations.filter((occupation) =>
    occupation.toLowerCase().includes(searchExclude.toLowerCase())
  );

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Included Occupations">
        <div className="flex flex-col gap-1 md:gap-2 border-l-4 border-yellow-500 pl-2 bg-yellow-50 p-1">
          <div className="flex items-center gap-1 ">
            <TriangleAlert className="text-yellow-500 " />
            <p className="text-yellow-600 font-bold">Warning:</p>
          </div>
          <div className="">
            <p className="text-yellow-600 text-sm">Use this section with caution. If you include some occupations in this section, Rook will include ONLY persons in those occupations, in your matches. Your preferences for age, gender, zip code will still be respected.</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to include in your matches.</p>
        <Input type="text" placeholder="Search occupations to include..." value={searchInclude} onChange={(e) => setSearchInclude(e.target.value)} className="w-96" />
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {includeOccupations.map((occupation) => (
            <Checkbox key={occupation} label={occupation} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Excluded Occupations">
        <div className="flex flex-col gap-1 md:gap-2 border-l-4 border-yellow-500 pl-2 bg-yellow-50 p-1">
          <div className="flex items-center gap-1 ">
            <TriangleAlert className="text-yellow-500 " />
            <p className="text-yellow-600 font-bold">Warning:</p>
          </div>
          <div className="">
            <p className="text-yellow-600 text-sm">Use this section with caution. If you exclude some occupations in this section, Rook will exclude ALL persons in those occupations, from your matches.</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <Input type="text" placeholder="Search occupations to exclude..." value={searchExclude} onChange={(e) => setSearchExclude(e.target.value)} className="w-96" />
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeOccupations.map((occupation) => (
            <Checkbox key={occupation} label={occupation} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default Occupations
