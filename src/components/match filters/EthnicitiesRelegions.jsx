import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"

import useFilter from "../../hooks/useFilter";

function EthnicitiesReligions() {

  const { excludeEthnicities, excludeReligions } = useFilter();

  const backgroundCheckStatus = [
    "Background Check Not Started",
    "Background Check Pending",
    "Background Check Started",
    "Background Check In Progress",
    "Background Check Failed",
    "Background Check Completed"
  ];

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Ethnicities">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeEthnicities.map((ethnicity) => (
            <Checkbox key={ethnicity?.id} label={ethnicity?.name} checked={ethnicity?.excluded} onChange={(ethnicity) => !ethnicity?.excluded} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Religions">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeReligions.map((religion) => (
            <Checkbox key={religion?.id} label={religion?.name} checked={religion?.excluded} onChange={!religion?.excluded} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Background Check Status" disabled>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {backgroundCheckStatus.map((status) => (
            <Checkbox key={status} label={status} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default EthnicitiesReligions
