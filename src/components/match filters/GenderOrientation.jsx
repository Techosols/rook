import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"

import useFilter from "../../hooks/useFilter";

function GenderOrientation() {


  const { excludeGenders, excludeSexualOrientations, excludeRelationshipTypes } = useFilter();


  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Gender">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeGenders?.map((gender) => (
            <Checkbox key={gender.id} label={gender.name} checked={gender?.excluded} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Orientation">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeSexualOrientations?.map((orientation) => (
            <Checkbox key={orientation.id} label={orientation.name} checked={orientation?.excluded} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Relationship Types">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeRelationshipTypes?.map((type) => (
            <Checkbox key={type.id} label={type.name} checked={type?.excluded} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default GenderOrientation
