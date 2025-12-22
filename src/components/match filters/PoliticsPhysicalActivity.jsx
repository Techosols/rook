import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"

import useFilter from "../../hooks/useFilter";

function PoliticsPhysicalActivity() {

  const { excludePoliticalAffiliations, excludePhysicalActivityIndexes, UpdatePoliticalAffiliation, savePoliticalAffiliation, UpdatePhysicalActivityIndex, savePhysicalActivityIndex, isLoading, isSavingPoliticalAffiliations, isSavingPhysicalActivityIndexes } = useFilter();


  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Political Affiliation" onSave={() => savePoliticalAffiliation()} disabled={isLoading || excludePoliticalAffiliations.length === 0} loading={isSavingPoliticalAffiliations}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {isLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}
          {excludePoliticalAffiliations?.map((affiliation) => (
            <Checkbox key={affiliation?.id} label={affiliation?.name} checked={affiliation?.excluded} onChange={() => UpdatePoliticalAffiliation(affiliation?.id)} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Physical Activity Index" onSave={() => savePhysicalActivityIndex()} disabled={isLoading || excludePhysicalActivityIndexes.length === 0} loading={isSavingPhysicalActivityIndexes}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
           {isLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}
          {excludePhysicalActivityIndexes?.map((level) => (
            <Checkbox key={level?.id} label={level?.name} checked={level?.excluded} onChange={() => UpdatePhysicalActivityIndex(level?.id)} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default PoliticsPhysicalActivity
