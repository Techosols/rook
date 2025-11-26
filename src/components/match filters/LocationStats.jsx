import { LucideBadgeInfo } from "lucide-react"
import FormSection from "../ui/FormSection"
import Input from "../ui/Input"
import Select from "../ui/Select";
import Radio from "../ui/Radio";

import useFilter from "../../hooks/useFilter";
import useOption from "../../hooks/useOption";

// import { useState } from "react";

function LocationStats() {


  const { educationLevels, alcoholConsumptionFrequencies } = useOption();

  const {
    zipCode, setZipCode,
    distance, setDistance,
    ageFrom, setAgeFrom,
    ageTo, setAgeTo,
    heightFromFeet, setHeightFromFeet,
    heightFromInches, setHeightFromInches,
    heightToFeet, setHeightToFeet,
    heightToInches, setHeightToInches,
    weightFrom, setWeightFrom,
    weightTo, setWeightTo,
    educationLevel, setEducationLevel,
    excludePeopleHaveKids, setExcludePeopleHaveKids,
    excludePeopleWantKids, setExcludePeopleWantKids,
    excludePeopleHavePets, setExcludePeopleHavePets,
    excludePeopleWantPets, setExcludePeopleWantPets,
    excludeAsexualPeople, setExcludeAsexualPeople,
    excludeDisablingPeople, setExcludeDisablingPeople,
    excludeSTIsPeople, setExcludeSTIsPeople,
    excludeSmokers, setExcludeSmokers,
    excludeRecreationalDrugUsers, setExcludeRecreationalDrugUsers,
    maximumAlcoholConsumption, setMaximumAlcoholConsumption,
    saveStats, saveKidsPets,saveLocation, saveHealthHabits,
    isLoading,
    isSavingLocation,
    isSavingStats,
    isSavingKidsPets,
    isSavingHealthHabits
  } = useFilter();

  // // Fields
  // const [zipCode, setZipCode] = useState("");
  // const [radius, setRadius] = useState("");
  // const [ageFrom, setAgeFrom] = useState("");
  // const [ageTo, setAgeTo] = useState("");
  // const [weightFrom, setWeightFrom] = useState("");
  // const [weightTo, setWeightTo] = useState("");
  // const [heightFrom, setHeightFrom] = useState({ feet: "", inches: "" });
  // const [heightTo, setHeightTo] = useState({ feet: "", inches: "" });
  // const [education, setEducation] = useState("");
  // const [excludeKids, setExcludeKids] = useState(false);
  // const [excludeFutureKids, setExcludeFutureKids] = useState(false);
  // const [excludePets, setExcludePets] = useState(false);
  // const [excludeFuturePets, setExcludeFuturePets] = useState(false);
  // const [excludeAsexualPersons, setExcludeAsexualPersons] = useState(false);
  // const [excludeDisabilities, setExcludeDisabilities] = useState(false);
  // const [excludeSTIs, setExcludeSTIs] = useState(false);
  // const [excludeSmokers, setExcludeSmokers] = useState(false);
  // const [excludeDrugs, setExcludeDrugs] = useState(false);
  // const [maxAlcoholConsumption, setMaxAlcoholConsumption] = useState("");


  return (
    <div className="p-1 flex flex-col gap-1 md:gap-4">
      <p className="text-gray-500 text-sm"> <LucideBadgeInfo className="inline-block mr-1" /> In this page, you provide info about yourself that can be used by others in filters, to include/exclude you in their matches.</p>
      <FormSection title="Location" onSave={() => saveLocation()} disabled={isLoading || (zipCode.length === 0 && distance.length === 0)} loading={isSavingLocation}>
        <p>Enter ZIP code and radius. You will be shown matches in and around this zip code only.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {isLoading ? (
          <>
            <div className="w-[70%] h-12 bg-gray-300 animate-pulse"></div>
            <div className="w-[70%] h-12 bg-gray-300 animate-pulse"></div>
            </>
        ) : (
          <>
           <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
            <Input type="text" placeholder="e.g., 12345" value={zipCode} onChange={(e) => setZipCode(e.target.value)} error={(zipCode.length !== 5 && zipCode.length !== 0) ? 'Invalid ZIP code' : undefined} />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Radius <span className="text-gray-500 font-normal">(miles) - (Max 500)</span></label>
            <Input type="number" placeholder="e.g., 25" value={distance} onChange={(e) => setDistance(e.target.value === "" ? "" : Number(e.target.value))} error={(distance > 500 ? 'Invalid radius - (Max 500)' : undefined)} />
          </div>
          </>
        )}
         
        </div>
      </FormSection>
      <FormSection title="Stats" onSave={() => saveStats()} disabled={isLoading} loading={isSavingStats}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4 md:gap-y-6">

          {isLoading ? (
            <>
              <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Age from - <span className="text-gray-500 font-normal">(Min 18 years)</span>
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 25"
                  value={ageFrom}
                  onChange={(e) => setAgeFrom(e.target.value)}
                  error={ageFrom < 18 && ageFrom !== '' ? 'Age must be at least 18' : undefined}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Age to - <span className="text-gray-500 font-normal">(Max 80 years)</span>
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 35"
                  value={ageTo}
                  onChange={(e) => setAgeTo(e.target.value)}
                  error={ageTo > 80 && ageTo !== '' ? 'Invalid age - (Max 80 years)' : undefined}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Weight from <span className="text-gray-500 font-normal">(pounds)</span>
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 120"
                  value={weightFrom}
                  onChange={(e) => setWeightFrom(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Weight to <span className="text-gray-500 font-normal">(pounds)</span>
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 200"
                  value={weightTo}
                  onChange={(e) => setWeightTo(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Height from <span className="text-gray-500 font-normal">(Feet, inches)</span>
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Feet"
                    className="w-24"
                    value={heightFromFeet}
                    onChange={(e) => setHeightFromFeet(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Inches"
                    className="w-24"
                    value={heightFromInches}
                    onChange={(e) => setHeightFromInches(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Height to <span className="text-gray-500 font-normal">(Feet, inches)</span>
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Feet"
                    className="w-24"
                    value={heightToFeet}
                    onChange={(e) => setHeightToFeet(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Inches"
                    className="w-24"
                    value={heightToInches}
                    onChange={(e) => setHeightToInches(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Education Level
                </label>
                <Select
                  options={educationLevels}
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                />
              </div>
            </>
          )}

        </div>
      </FormSection>

      <FormSection title="Kids/Pets" onSave={() => saveKidsPets()} loading={isSavingKidsPets}>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_kids">Exclude persons with kids?</label>
            <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="flex gap-2">
              <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
              <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
              </div>
            ) : (
              <>
              <Radio label="Yes" name="exclude_kids" checked={excludePeopleHaveKids === true} onChange={() => setExcludePeopleHaveKids(true)} />
              <Radio label="No" name="exclude_kids" checked={excludePeopleHaveKids === false} onChange={() => setExcludePeopleHaveKids(false)} />
              </>
            )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_future_kids">Exclude persons who want kids in the future?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="flex gap-2">
                  <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                  <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </div>
              ) : (
                <>
                <Radio label="Yes" name="exclude_future_kids" checked={excludePeopleWantKids === true} onChange={() => setExcludePeopleWantKids(true)} />
                <Radio label="No" name="exclude_future_kids" checked={excludePeopleWantKids === false} onChange={() => setExcludePeopleWantKids(false)} />
                </>)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_pets">Exclude persons with pets?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="flex gap-2">
                  <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                  <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </div>
              ) : (
                <>
                <Radio label="Yes" name="exclude_pets" checked={excludePeopleHavePets === true} onChange={() => setExcludePeopleHavePets(true)} />
                <Radio label="No" name="exclude_pets" checked={excludePeopleHavePets === false} onChange={() => setExcludePeopleHavePets(false)} />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_future_pets">Exclude persons who want pets in the future?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                <div className="flex gap-2">
                  <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                  <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </div>
                </>
              ) : (
                <>
                <Radio label="Yes" name="exclude_future_pets" checked={excludePeopleWantPets === true} onChange={() => setExcludePeopleWantPets(true)} />
                <Radio label="No" name="exclude_future_pets" checked={excludePeopleWantPets === false} onChange={() => setExcludePeopleWantPets(false)} />
                </>
              )}
            </div>
          </div>
        </div>
      </FormSection>
      <FormSection title="Health/Habits" onSave={() => saveHealthHabits()} disabled={isLoading} loading={isSavingHealthHabits}>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_asexual_persons">Exclude asexual persons?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </>
              ) : (
                <>
                <Radio label="Yes" name="exclude_asexual_persons" checked={excludeAsexualPeople === true} onChange={() => setExcludeAsexualPeople(true)} />
                <Radio label="No" name="exclude_asexual_persons" checked={excludeAsexualPeople === false} onChange={() => setExcludeAsexualPeople(false)} />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_disabilities">Exclude persons with disabilities?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </>
              ) : (
                <>
                <Radio label="Yes" name="exclude_disabilities" checked={excludeDisablingPeople === true} onChange={() => setExcludeDisablingPeople(true)} />
                <Radio label="No" name="exclude_disabilities" checked={excludeDisablingPeople === false} onChange={() => setExcludeDisablingPeople(false)} />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_stis">Exclude persons with STIs?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </>
              ) : (
                <>
              <Radio label="Yes" name="exclude_stis" checked={excludeSTIsPeople === true} onChange={() => setExcludeSTIsPeople(true)} />
              <Radio label="No" name="exclude_stis" checked={excludeSTIsPeople === false} onChange={() => setExcludeSTIsPeople(false)} />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_smokers">Exclude smokers?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </>
              ) : (
                <>
              <Radio label="Yes" name="exclude_smokers" checked={excludeSmokers === true} onChange={() => setExcludeSmokers(true)} />
              <Radio label="No" name="exclude_smokers" checked={excludeSmokers === false} onChange={() => setExcludeSmokers(false)} />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_drugs">Exclude rec drug users?</label>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                <div className="w-10 h-8 bg-gray-300 animate-pulse"></div>
                </>
              ) : (
                <>
              <Radio label="Yes" name="exclude_drugs" checked={excludeRecreationalDrugUsers === true} onChange={() => setExcludeRecreationalDrugUsers(true)} />
              <Radio label="No" name="exclude_drugs" checked={excludeRecreationalDrugUsers === false} onChange={() => setExcludeRecreationalDrugUsers(false)} />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="exclude_drugs">Maximum Alcohol Consumption</label>
            {isLoading ? (
              <div className="w-1/2 h-8 bg-gray-300 animate-pulse"></div>
            ) : <Select options={alcoholConsumptionFrequencies} value={maximumAlcoholConsumption} onChange={(e) => setMaximumAlcoholConsumption(e.target.value)} />}
            </div>
        </div>
      </FormSection>
    </div>
  )
}

export default LocationStats
