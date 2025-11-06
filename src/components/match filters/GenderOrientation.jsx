import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"

import useOption from "../../hooks/useOption";

function GenderOrientation() {

  const { genders = [], orientations = [], relationshipTypes = [] } = useOption();

  console.log("Type of genders:", typeof genders);
  console.log("Type of orientations:", typeof orientations);
  console.log("Type of relationshipTypes:", typeof relationshipTypes);

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Gender">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {Object.values(genders).map((gender) => (
            <Checkbox key={gender} label={gender} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Orientation">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {Object.values(orientations).map((orientation) => (
            <Checkbox key={orientation} label={orientation} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Relationship Types">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {Object.values(relationshipTypes).map((type) => (
            <Checkbox key={type} label={type} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default GenderOrientation
