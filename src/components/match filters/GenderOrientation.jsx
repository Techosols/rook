import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"

import useFilter from "../../hooks/useFilter";

function GenderOrientation() {


  const { excludeGenders, excludeSexualOrientations, excludeRelationshipTypes, UpdateGender, saveGender, UpdateOrientation, saveOrientation, UpdateRelationshipType, saveRelationshipType, isLoading } = useFilter();


  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Gender" onSave={() => saveGender()} disabled={isLoading || excludeGenders.length === 0}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {isLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}
          {excludeGenders?.map((gender) => (
            <Checkbox key={gender.id} label={gender.name} checked={gender?.excluded} onChange={() => UpdateGender(gender.id)} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Orientation" onSave={() => saveOrientation()} disabled={isLoading || excludeSexualOrientations.length === 0}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
           {isLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}
          {excludeSexualOrientations?.map((orientation) => (
            <Checkbox key={orientation.id} label={orientation.name} checked={orientation?.excluded} onChange={() => UpdateOrientation(orientation.id)} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Relationship Types" onSave={() => saveRelationshipType()} disabled={isLoading || excludeRelationshipTypes.length === 0}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {isLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}
          {excludeRelationshipTypes?.map((type) => (
            <Checkbox key={type.id} label={type.name} checked={type?.excluded} onChange={() => UpdateRelationshipType(type.id)} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default GenderOrientation
