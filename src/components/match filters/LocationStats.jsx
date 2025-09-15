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
  const [ageFrom, setAgeFrom] = useState("");
  const [ageTo, setAgeTo] = useState("");
  const [weightFrom, setWeightFrom] = useState("");
  const [weightTo, setWeightTo] = useState("");
  const [heightFrom, setHeightFrom] = useState({ feet: "", inches: "" });
  const [heightTo, setHeightTo] = useState({ feet: "", inches: "" });
  const [education, setEducation] = useState("");
  const [excludeKids, setExcludeKids] = useState(false);
  const [excludeFutureKids, setExcludeFutureKids] = useState(false);
  const [excludePets, setExcludePets] = useState(false);
  const [excludeFuturePets, setExcludeFuturePets] = useState(false);
  const [excludeAsexualPersons, setExcludeAsexualPersons] = useState(false);
  const [excludeDisabilities, setExcludeDisabilities] = useState(false);
  const [excludeSTIs, setExcludeSTIs] = useState(false);
  const [excludeSmokers, setExcludeSmokers] = useState(false);
  const [excludeDrugs, setExcludeDrugs] = useState(false);
  const [maxAlcoholConsumption, setMaxAlcoholConsumption] = useState("");


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
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Radius <span className="text-gray-500 font-normal">(miles) - (Max 600)</span></label>
            <Input type="number" placeholder="e.g., 25" value={radius} onChange={(e) => setRadius(e.target.value)} error={(radius > 600 ? 'Invalid radius - (Max 600)' : undefined)} />
          </div>
        </div>
      </FormSection>
      <FormSection title="Stats">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4 md:gap-y-6">
          <div className="">
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Age from</label>
            <Input type="number" placeholder="e.g., 25" value={ageFrom} onChange={(e) => setAgeFrom(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Age to - <span className="text-gray-500 font-normal">(Min 18 years)</span></label>
            <Input type="number" placeholder="e.g., 35" value={ageTo} onChange={(e) => setAgeTo(e.target.value)} error={((ageTo < 18 && ageTo !== '') ? 'Invalid age - (Min 18 years)' : undefined)} />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Weight from <span className="text-gray-500 font-normal">(pounds)</span></label>
            <Input type="number" placeholder="e.g., 120" value={weightFrom} onChange={(e) => setWeightFrom(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Weight to <span className="text-gray-500 font-normal">(pounds)</span></label>
            <Input type="number" placeholder="e.g., 200" value={weightTo} onChange={(e) => setWeightTo(e.target.value)} />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Height from <span className="text-gray-500 font-normal">(Feet, inches)</span></label>
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Feet" className="w-24" value={heightFrom.feet} onChange={(e) => setHeightFrom({ ...heightFrom, feet: e.target.value })} />
              <Input type="number" placeholder="Inches" className="w-24" value={heightFrom.inches} onChange={(e) => setHeightFrom({ ...heightFrom, inches: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Height to <span className="text-gray-500 font-normal">(Feet, inches)</span></label>
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Feet" className="w-24" value={heightTo.feet} onChange={(e) => setHeightTo({ ...heightTo, feet: e.target.value })} />
              <Input type="number" placeholder="Inches" className="w-24" value={heightTo.inches} onChange={(e) => setHeightTo({ ...heightTo, inches: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Minimum Education Level</label>
            <Select options={['None', 'High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD']} value={education} onChange={(e) => setEducation(e.target.value)} />
          </div>
        </div>
      </FormSection>
      <FormSection title="Kids/Pets">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_kids">Exclude persons with kids?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_kids" checked={excludeKids === true} onChange={() => setExcludeKids(true)} />
              <Radio label="No" name="exclude_kids" checked={excludeKids === false} onChange={() => setExcludeKids(false)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_future_kids">Exclude persons who want kids in the future?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_future_kids" checked={excludeFutureKids === true} onChange={() => setExcludeFutureKids(true)} />
              <Radio label="No" name="exclude_future_kids" checked={excludeFutureKids === false} onChange={() => setExcludeFutureKids(false)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_pets">Exclude persons with pets?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_pets" checked={excludePets === true} onChange={() => setExcludePets(true)} />
              <Radio label="No" name="exclude_pets" checked={excludePets === false} onChange={() => setExcludePets(false)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_future_pets">Exclude persons who want pets in the future?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_future_pets" checked={excludeFuturePets === true} onChange={() => setExcludeFuturePets(true)} />
              <Radio label="No" name="exclude_future_pets" checked={excludeFuturePets === false} onChange={() => setExcludeFuturePets(false)} />
            </div>
          </div>
        </div>
      </FormSection>
      <FormSection title="Health/Habits">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_asexual_persons">Exclude asexual persons?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_asexual_persons" checked={excludeAsexualPersons === true} onChange={() => setExcludeAsexualPersons(true)} />
              <Radio label="No" name="exclude_asexual_persons" checked={excludeAsexualPersons === false} onChange={() => setExcludeAsexualPersons(false)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_disabilities">Exclude persons with disabilities?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_disabilities" checked={excludeDisabilities === true} onChange={() => setExcludeDisabilities(true)} />
              <Radio label="No" name="exclude_disabilities" checked={excludeDisabilities === false} onChange={() => setExcludeDisabilities(false)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_stis">Exclude persons with STIs?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_stis" checked={excludeSTIs === true} onChange={() => setExcludeSTIs(true)} />
              <Radio label="No" name="exclude_stis" checked={excludeSTIs === false} onChange={() => setExcludeSTIs(false)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_smokers">Exclude smokers?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_smokers" checked={excludeSmokers === true} onChange={() => setExcludeSmokers(true)} />
              <Radio label="No" name="exclude_smokers" checked={excludeSmokers === false} onChange={() => setExcludeSmokers(false)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_drugs">Exclude rec drug users?</label>
            <div className="flex items-center gap-2">
              <Radio label="Yes" name="exclude_drugs" checked={excludeDrugs === true} onChange={() => setExcludeDrugs(true)} />
              <Radio label="No" name="exclude_drugs" checked={excludeDrugs === false} onChange={() => setExcludeDrugs(false)} />
            </div>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_drugs">Maximum Alcohol Consumption</label>
            <Select options={['No limit', 'Never', 'Socially', 'Once a week', 'Once a month', 'Rarely']} value={maxAlcoholConsumption} onChange={setMaxAlcoholConsumption} />
          </div>
        </div>
      </FormSection>

    </div>
  )
}

export default LocationStats
