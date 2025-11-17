import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"
import useFilter from "../../hooks/useFilter";

function EthnicitiesReligions() {
  
  const { excludeEthnicities = [], excludeReligions = [], excludeBackgroundCheckStatus, saveEthnicities, UpdateEthnicities, UpdateReligion, saveReligion, UpdateBackgroundCheckStatus, saveBackgroundCheckStatus, isLoading} = useFilter();
  console.log('excludeEthnicities', excludeEthnicities);

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Ethnicities" onSave={() => saveEthnicities()} disabled={isLoading || excludeEthnicities.length === 0}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {isLoading && (
            <div className="flex flex-col gap-2">
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            </div>
          )}
          {excludeEthnicities.map((ethnicity) => (
            <Checkbox key={ethnicity?.id} label={ethnicity?.name} checked={ethnicity?.excluded} onChange={() => UpdateEthnicities(ethnicity?.id)} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Religions" onSave={() => saveReligion()}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeReligions.map((religion) => (
            <Checkbox key={religion?.id} label={religion?.name} checked={religion?.excluded}  onChange={() => UpdateReligion(religion?.id)} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Background Check Status" onSave={() => saveBackgroundCheckStatus()}>
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {excludeBackgroundCheckStatus.map((status) => (
            <Checkbox key={status?.id} label={status?.name} checked={status?.excluded} onChange={() => UpdateBackgroundCheckStatus(status?.id)} />
          ))}
        </div>
      </FormSection>
    </div>
  )
}

export default EthnicitiesReligions
