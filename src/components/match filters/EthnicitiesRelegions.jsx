import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Checkbox from "../ui/Checkbox"

function EthnicitiesReligions() {


  const Ethnicities = [
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "White or Caucasian",
    "Middle Eastern or North African",
    "Native American or Alaska Native",
    "Native Hawaiian or Other Pacific Islander",
    "Mixed or Multiracial",
    "Other"
  ];

  const Religions = [
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Judaism",
    "Sikhism",
    "Atheism/Agnosticism",
    "Other"
  ];

  const backgroundCheckStatus = [
    "Background Check Not Started",
    "Background Check Pending",
    "Background Check Failed"
  ];

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <FormSection title="Ethnicities">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {Ethnicities.map((ethnicity) => (
            <Checkbox key={ethnicity} label={ethnicity} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Religions">
        <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> Check off all options you want to exclude from your matches.</p>
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 max-h-60 overflow-y-auto flex flex-col gap-2">
          {Religions.map((religion) => (
            <Checkbox key={religion} label={religion} />
          ))}
        </div>
      </FormSection>
      <FormSection title="Background Check Status">
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
