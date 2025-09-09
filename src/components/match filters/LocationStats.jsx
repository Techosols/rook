import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Input from "../ui/Input"
import Select from "../ui/Select";
import Radio from "../ui/Radio";

import { useState } from "react";

function LocationStats() {

  // Fields
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState("");


  return (
    <div className="p-1 flex flex-col gap-1 md:gap-4">
      <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> In this page, you provide info about yourself that can be used by others in filters, to include/exclude you in their matches.</p>
      <FormSection title="Location">
        <p>Enter ZIP code and radius. You will be shown matches in and around this zip code only.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
            <Input type="text" placeholder="e.g., 12345" value={zipCode} onChange={(e) => setZipCode(e.target.value)} error={(zipCode.length !== 5 && zipCode.length !== 0) ? 'Invalid ZIP code' : undefined} />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Radius (miles) - (Max 600)</label>
            <Input type="number" placeholder="e.g., 25" value={radius} onChange={(e) => setRadius(e.target.value)} error={(radius > 600 ? 'Invalid radius - (Max 600)' : undefined)} />
          </div>
        </div>
      </FormSection>
      <FormSection title="Stats">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4 md:gap-y-6">
          <div className="">
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Age from</label>
            <Input type="number" placeholder="e.g., 25" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Age to - (Min 18 years)</label>
            <Input type="number" placeholder="e.g., 35" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Weight from (pounds)</label>
            <Input type="number" placeholder="e.g., 120" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Weight to (pounds)</label>
            <Input type="number" placeholder="e.g., 200" />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Height from (Feet, inches)</label>
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Feet" className="w-24" />
              <Input type="number" placeholder="Inches" className="w-24" />
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Height to (Feet, inches)</label>
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Feet" className="w-24" />
              <Input type="number" placeholder="Inches" className="w-24" />
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Minimum Education Level</label>
            <Select options={[
              { value: 'none', label: 'None' },
              { value: 'highschool', label: 'High School' },
              { value: 'bachelors', label: 'Bachelor\'s Degree' },
              { value: 'masters', label: 'Master\'s Degree' },
              { value: 'phd', label: 'PhD' },
            ]} />
          </div>
        </div>
      </FormSection>
      <FormSection title="Kids/Pets">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_kids">Exclude persons with kids?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_kids" />
              <Radio label="No" name="exclude_kids" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_future_kids">Exclude persons who want kids in the future?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_future_kids" />
              <Radio label="No" name="exclude_future_kids" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_pets">Exclude persons with pets?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_pets" />
              <Radio label="No" name="exclude_pets" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_future_pets">Exclude persons who want pets in the future?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_future_pets" />
              <Radio label="No" name="exclude_future_pets" />
            </div>
          </div>
        </div>
      </FormSection>
      <FormSection title="Health/Habits">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_asexual_persons">Exclude asexual persons?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_asexual_persons" />
              <Radio label="No" name="exclude_asexual_persons" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_disabilities">Exclude persons with disabilities?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_disabilities" />
              <Radio label="No" name="exclude_disabilities" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_stis">Exclude persons with STIs?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_stis" />
              <Radio label="No" name="exclude_stis" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_smokers">Exclude smokers?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_smokers" />
              <Radio label="No" name="exclude_smokers" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_drugs">Exclude rec drug users?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_drugs" />
              <Radio label="No" name="exclude_drugs" />
            </div>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_drugs">Maximum Alcohol Consumption</label>
            <Select options={[
              { value: 'none', label: 'None' },
              { value: 'social', label: 'Social Drinker' },
              { value: 'moderate', label: 'Moderate Drinker' },
              { value: 'heavy', label: 'Heavy Drinker' },
            ]} />
          </div>
        </div>
      </FormSection>

    </div>
  )
}

export default LocationStats
