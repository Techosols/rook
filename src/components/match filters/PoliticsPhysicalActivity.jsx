import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"

import useOption from "../../hooks/useOption";

function PoliticsPhysicalActivity() {

  const { politicalAffiliations = []} = useOption();

  const physicalActivityLevels = [
    "Very High",
    "High",
    "Acceptable",
    "Low",
    "Inactive"
  ];

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Political Affiliation">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {Object.values(politicalAffiliations).map((affiliation) => (
            <Checkbox key={affiliation} label={affiliation} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Physical Activity Index">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {physicalActivityLevels.map((level) => (
            <Checkbox key={level} label={level} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default PoliticsPhysicalActivity
