import FormSection from "../ui/FormSection";
import { BadgeInfo, Check, LucideBadgeInfo } from "lucide-react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Select from "../ui/Select";
import Radio from "../ui/Radio";

import useProfile from "../../hooks/useProfile";
import useOption from "../../hooks/useOption";

import { useEffect, useState } from "react";
import userService from "../../services/user";

import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { toast } from "react-toastify";

function YourInfo() {
  const { profile, isProfileLoading, physicalActivity } = useProfile();
  const {
    educationLevels,
    genders,
    relationshipStatuses,
    religions,
    loveLanguages,
    ethnicities,
    orientations,
    physicalActivityDurations,
    physicalActivityFrequencies,
    physicalActivityIntensities,
    physicalActivityTypes,
    physicalActivityLengths,
    politicalAffiliations,
    occupationProfiles,
    alcoholConsumptionFrequencies,
    starSigns,
    miscRelationshipTypes,
    miscPhysicalActivityTypes
  } = useOption();


  const api = useAuthenticatedApi();

  // States
  const [preferredName, setPreferredName] = useState("");
  const [age, setAge] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [moniker, setMoniker] = useState("");
  const [relationshipType, setRelationshipType] = useState([]);
  const [gender, setGender] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [religion, setReligion] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [occupation, setOccupation] = useState("");
  const [politicalAffiliation, setPoliticalAffiliation] = useState("");
  const [sexualOrientation, setSexualOrientation] = useState("");
  const [asexual, setAsexual] = useState(false);
  const [hasKids, setHasKids] = useState(false);
  const [wantsKids, setWantsKids] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [wantsPets, setWantsPets] = useState(true);
  const [exerciseFrequency, setExerciseFrequency] = useState("");
  const [exerciseIntensity, setExerciseIntensity] = useState("");
  const [exerciseDuration, setExerciseDuration] = useState("");
  const [exerciseLength, setExerciseLength] = useState("");
  const [exerciseType, setExerciseType] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(null);
  const [smoke, setSmoke] = useState(false);
  const [recDrug, setRecDrug] = useState(false);
  const [disability, setDisability] = useState(false);
  const [stdSti, setStdSti] = useState(false);
  const [drinks, setDrinks] = useState("");
  const [loveLanguage, setLoveLanguage] = useState("");
  const [starSign, setStarSign] = useState("");
  const [includeInRandomMatches, setIncludeInRandomMatches] = useState(false);

  // Loading States
  const [youSectionLoading, setYouSectionLoading] = useState(false);
  const [aboutYouSectionLoading, setAboutYouSectionLoading] = useState(false);
  const [kidsPetsSectionLoading, setKidsPetsSectionLoading] = useState(false);
  const [physicalActivitySectionLoading, setPhysicalActivitySectionLoading] = useState(false);
  const [healthHabitsSectionLoading, setHealthHabitsSectionLoading] = useState(false);
  const [miscSectionLoading, setMiscSectionLoading] = useState(false);


  async function updateYouSection() {
    const selectedRelationShip = relationshipType.filter(rt => rt.selected).map(rt => rt.id);
    try {
      setYouSectionLoading(true);
      await userService.updateUserProfile(api, {
        preferredName: preferredName,
        heightInInches:
          (parseInt(heightFeet) || 0) * 12 + (parseInt(heightInches) || 0),
        weight: weight,
      });
      await userService.updateUserMiscData(api, 'relationshiptypes', selectedRelationShip);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setYouSectionLoading(false);
    }
  }

  async function updateAboutYouSection() {
    try {
      setAboutYouSectionLoading(true);
      await userService.updateUserProfile(api, {
        gender: gender,
        relationshipStatus: relationshipStatus,
        ethnicity: ethnicity,
        religion: religion,
        educationLevel: educationLevel,
        occupation: occupation,
        politicalAffiliation: politicalAffiliation,
        asexual: asexual,
        orientation: sexualOrientation,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setAboutYouSectionLoading(false);
    }
  }

  async function updateKidsPetsSection() {
    try {
      setKidsPetsSectionLoading(true);
      await userService.updateUserProfile(api, {
        hasKidsNow: hasKids,
        wantOwnKids: wantsKids,
        hasPetsNow: hasPets,
        wantOwnPets: wantsPets,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setKidsPetsSectionLoading(false);
    }
  }

  async function updatePhysicalActivitySection() {

    const activityTypeDictionary = exerciseType.reduce((acc, activity) => {
      acc[activity.name] = activity.selected === true;
      return acc;
    }, {});

    console.log('Selected Activity: ', exerciseType)
    console.log('Activity Type Dictionary: ', activityTypeDictionary)
    try {
      setPhysicalActivitySectionLoading(true);
      await userService.updateUserPhysicalActivity(api, {
        frequency: exerciseFrequency,
        length: exerciseLength,
        duration: exerciseDuration,
        intensity: exerciseIntensity,
        index: exerciseIndex,
        activityTypes: activityTypeDictionary
      })
      //await userService.updateUserMiscData(api, 'physicalactivitytype', selectedActivityTypes);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Your changes could not be saved. Please try again.');
    } finally {
      setPhysicalActivitySectionLoading(false);
    }
  }

  async function updateHealthHabitsSection() {
    try {
      setHealthHabitsSectionLoading(true);
      await userService.updateUserProfile(api, {
        isSmoker: smoke,
        isRecreationalDrugUser: recDrug,
        hasDisability: disability,
        hasSexuallyTransmittedInfection: stdSti,
        alcoholConsumptionFrequency: drinks,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setHealthHabitsSectionLoading(false);
    }
  }

  async function updateMiscSection() {
    try {
      setMiscSectionLoading(true);
      await userService.updateUserProfile(api, {
        loveLanguage: loveLanguage,
        starSign: starSign,
        includeInRandomMatches: includeInRandomMatches,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setMiscSectionLoading(false);
    }
  }

  useEffect(() => {
    if (!isProfileLoading) {
      setPreferredName(profile?.preferredName || "");
      setHeightFeet(profile?.heightFeet || "");
      if (profile?.heightInInches) {
        const totalInches = profile.heightInInches;
        setHeightFeet(Math.floor(totalInches / 12).toString());
        setHeightInches((totalInches % 12).toString());
      } else {
        setHeightFeet(profile?.heightFeet || "0");
        setHeightInches(profile?.heightInInches || "0");
      }
      setWeight(profile?.weight || "");
      setMoniker(profile?.moniker || "");
      setAge(profile?.ageInYears || "");
      setZipCode(profile?.postalCode || "");
      setRelationshipType(Array.isArray(miscRelationshipTypes) ? miscRelationshipTypes : []);
      setGender(profile?.gender || "");
      setRelationshipStatus(profile?.relationshipStatus || "");
      setEthnicity(profile?.ethnicity || "");
      setReligion(profile?.religion || "");
      setEducationLevel(profile?.educationLevel || "");
      setOccupation(profile?.occupation || "");
      setPoliticalAffiliation(profile?.politicalAffiliation || "");
      setSexualOrientation(profile?.orientation || "");
      setAsexual(profile?.asexual || false);
      setHasKids(profile?.hasKidsNow || false);
      setWantsKids(profile?.wantOwnKids || false);
      setHasPets(profile?.hasPetsNow || false);
      setWantsPets(profile?.wantOwnPets || false);
      setExerciseFrequency(physicalActivity?.frequency || "");
      setExerciseIntensity(physicalActivity?.intensity || "");
      setExerciseDuration(physicalActivity?.duration || "");
      setExerciseLength(physicalActivity?.length || "");
      // Always set exerciseType from miscPhysicalActivityTypes (array of {id, name, selected})
      setExerciseType(Array.isArray(miscPhysicalActivityTypes) ? miscPhysicalActivityTypes : []);
      setExerciseIndex(physicalActivity?.index || null);
      setSmoke(profile?.isSmoker || false);
      setRecDrug(profile?.isRecreationalDrugUser || false);
      setDisability(profile?.hasDisability || false);
      setStdSti(profile?.hasSexuallyTransmittedInfection || false);
      setDrinks(profile?.alcoholConsumptionFrequency || "");
      setLoveLanguage(profile?.loveLanguage || "");
      setStarSign(profile?.starSign || "");
      setIncludeInRandomMatches(profile?.includeInRandomMatches || false);
    }
  }, [profile, miscRelationshipTypes, isProfileLoading]);

  return (
    <div className="p-1 flex flex-col gap-1 md:gap-4">
      <p className="text-sm text-gray-600">
        <span>
          <LucideBadgeInfo className="inline mb-1 mr-1" size={16} />
        </span>
        In this page, you provide info about yourself that can be used by others
        in filters, to include/exclude you in their matches.
      </p>
      <FormSection title="You" onSave={() => updateYouSection()} loading={youSectionLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="firstName">
              Preferred Name
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Input
                placeholder="What do you want to be called?"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="lastName">
              Age
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Input
                placeholder="Age"
                type="number"
                value={age}
                disabled={true}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="location">
              ZipCode
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Input
                placeholder="Your Location"
                value={zipCode}
                disabled={true}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="height">
              Height
            </label>
            {isProfileLoading ? (
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-2">
                <Input
                  placeholder="Feet"
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                />
                <Input
                  placeholder="Inches"
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="weight">
              Moniker
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Input placeholder="Moniker" disabled={true} value={moniker} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="bodyType">
              Weight{" "}
              <span className="text-gray-500">
                {"("} in pounds {")"}
              </span>
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Input
                placeholder="Weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="bodyType">
              Relationship Types
            </label>
            <div className="flex flex-col gap-1 h-30 overflow-y-auto border border-gray-300 dark:border-gray-600 p-2 rounded">
              {relationshipType && relationshipType.length > 0 ? (
                relationshipType.map((typeObj) => (
                  <Checkbox
                    key={typeObj.id}
                    label={typeObj.name}
                    checked={typeObj.selected}
                    onChange={() => {
                      setRelationshipType(prev =>
                        prev.map(item =>
                          item.id === typeObj.id ? { ...item, selected: !item.selected } : item
                        )
                      );
                    }}
                  />
                ))
              ) : (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                ))
              )}
            </div>
          </div>
        </div>
      </FormSection>
      <FormSection title="About You" onSave={() => updateAboutYouSection()} loading={aboutYouSectionLoading}>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Gender">
              Gender
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={genders}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Select Gender"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="RelationshipStatus"
            >
              Relationship Status
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={relationshipStatuses}
                value={relationshipStatus}
                onChange={(e) => setRelationshipStatus(e.target.value)}
                placeholder="Select Relationship Status"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Ethnicity">
              Ethnicity
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={ethnicities}
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                placeholder="Select Ethnicity"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Religion">
              Religion
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={religions}
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                placeholder="Select Religion"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="EducationLevel"
            >
              Education Level
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={educationLevels}
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                placeholder="Select Education Level"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Occupation">
              Occupation
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={occupationProfiles}
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="Select Occupation"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="PoliticalAffliation"
            >
              Political Affiliation
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={politicalAffiliations}
                value={politicalAffiliation}
                onChange={(e) => setPoliticalAffiliation(e.target.value)}
                placeholder="Select Political Affiliation"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="SexualOrientation"
            >
              Sexual Orientation
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={orientations}
                value={sexualOrientation}
                onChange={(e) => setSexualOrientation(e.target.value)}
                placeholder="Select Sexual Orientation"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Asexual">
              Asexual{" "}
            </label>
            {isProfileLoading ? (
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="asexual"
                  checked={asexual === true}
                  onChange={() => setAsexual(true)}
                />
                <Radio
                  label="No"
                  name="asexual"
                  checked={asexual === false}
                  onChange={() => setAsexual(false)}
                />
              </div>
            )}
          </div>
        </div>
      </FormSection>
      <FormSection title="Kids/Pets" onSave={() => updateKidsPetsSection()} loading={kidsPetsSectionLoading}>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Kids">
              Do you have kids?
            </label>
            {isProfileLoading ? (
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="kids"
                  checked={hasKids === true}
                  onChange={() => setHasKids(true)}
                />
                <Radio
                  label="No"
                  name="kids"
                  checked={hasKids === false}
                  onChange={() => setHasKids(false)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="wantKids">
              Do you want kids in the future?
            </label>
            {isProfileLoading ? (
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="wantKids"
                  checked={wantsKids === true}
                  onChange={() => setWantsKids(true)}
                />
                <Radio
                  label="No"
                  name="wantKids"
                  checked={wantsKids === false}
                  onChange={() => setWantsKids(false)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Pets">
              Do you have pets now?
            </label>
            {isProfileLoading ? (
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="pets"
                  checked={hasPets === true}
                  onChange={() => setHasPets(true)}
                />
                <Radio
                  label="No"
                  name="pets"
                  checked={hasPets === false}
                  onChange={() => setHasPets(false)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="wantPets">
              Do you want pets in the future?
            </label>
            {isProfileLoading ? (
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="wantPets"
                  checked={wantsPets === true}
                  onChange={() => setWantsPets(true)}
                />
                <Radio
                  label="No"
                  name="wantPets"
                  checked={wantsPets === false}
                  onChange={() => setWantsPets(false)}
                />
              </div>
            )}
          </div>
        </div>
      </FormSection>
      <FormSection title="Physical Activity" onSave={() => updatePhysicalActivitySection()} loading={physicalActivitySectionLoading} disabled={true}>
        <p className="text-gray-400 text-sm flex gap-2 items-center">
          <span>
            <BadgeInfo />
          </span>{" "}
          We use this data to compute a "physical activity index" for you that
          other users can filter by
        </p>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseFrequency"
            >
              Frequency
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={physicalActivityFrequencies}
                value={exerciseFrequency}
                onChange={(e) => setExerciseFrequency(e.target.value)}
                placeholder="Select Frequency"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseIntensity"
            >
              Intensity
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={physicalActivityIntensities}
                value={exerciseIntensity}
                onChange={(e) => setExerciseIntensity(e.target.value)}
                placeholder="Select Intensity"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseDuration"
            >
              Duration
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={physicalActivityDurations}
                value={exerciseDuration}
                onChange={(e) => setExerciseDuration(e.target.value)}
                placeholder="Select Duration"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseLength"
            >
              Length
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={physicalActivityLengths}
                value={exerciseLength}
                onChange={(e) => setExerciseLength(e.target.value)}
                placeholder="Select Length"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-start h-20">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseType"
            >
              Type
            </label>
            <div className="flex flex-col h-32 overflow-y-scroll border border-gray-300 dark:border-gray-600 p-2 rounded mb-1">
              {!physicalActivityTypes && Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
              ))}
              {exerciseType && exerciseType.length > 0 ? (
                exerciseType.map((typeObj) => (
                  <Checkbox
                    key={typeObj.id}
                    label={typeObj.name}
                    checked={typeObj.selected}
                    onChange={() => {
                      setExerciseType(prev =>
                        prev.map(item =>
                          item.id === typeObj.id ? { ...item, selected: !item.selected } : item
                        )
                      );
                    }}
                  />
                ))
              ) : (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                ))
              )}
            </div>
          </div>
        </div>
      </FormSection>
      <FormSection title="Health/Habits" onSave={() => updateHealthHabitsSection()} loading={healthHabitsSectionLoading}>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="smoke">
              Are you a smoker?
            </label>
            {isProfileLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="smoke"
                  checked={smoke === true}
                  onChange={() => setSmoke(true)}
                />
                <Radio
                  label="No"
                  name="smoke"
                  checked={smoke === false}
                  onChange={() => setSmoke(false)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="recDrug">
              Do you use rec drugs?
            </label>
            {isProfileLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="recDrug"
                  checked={recDrug === true}
                  onChange={() => setRecDrug(true)}
                />
                <Radio
                  label="No"
                  name="recDrug"
                  checked={recDrug === false}
                  onChange={() => setRecDrug(false)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="disability">
              Disabilities?
            </label>
            {isProfileLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="disability"
                  checked={disability === true}
                  onChange={() => setDisability(true)}
                />
                <Radio
                  label="No"
                  name="disability"
                  checked={disability === false}
                  onChange={() => setDisability(false)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="stdSti">
              STDs/STIs
            </label>
            {isProfileLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="stdSti"
                  checked={stdSti === true}
                  onChange={() => setStdSti(true)}
                />
                <Radio
                  label="No"
                  name="stdSti"
                  checked={stdSti === false}
                  onChange={() => setStdSti(false)}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="alcoholConsumptionFrequency"
            >
              Alcohol Consumption Frequency
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={alcoholConsumptionFrequencies}
                value={drinks}
                onChange={(e) => setDrinks(e.target.value)}
              />
            )}
          </div>
        </div>
      </FormSection>
      <FormSection title="Misc" onSave={() => updateMiscSection()} loading={miscSectionLoading}>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="loveLang">
              Your love language
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={loveLanguages}
                value={loveLanguage}
                onChange={(e) => setLoveLanguage(e.target.value)}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="starSign">
              Your Star Sign
            </label>
            {isProfileLoading ? (
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <Select
                options={starSigns}
                value={starSign}
                onChange={(e) => setStarSign(e.target.value)}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="includeInRandomMatches"
            >
              Include you in Random Matches?
            </label>
            {isProfileLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Radio
                  label="Yes"
                  name="includeInRandomMatches"
                  checked={includeInRandomMatches === true}
                  onChange={() => setIncludeInRandomMatches(true)}
                />
                <Radio
                  label="No"
                  name="includeInRandomMatches"
                  checked={includeInRandomMatches === false}
                  onChange={() => setIncludeInRandomMatches(false)}
                />
              </div>
            )}
          </div>
        </div>
      </FormSection>
    </div>
  );
}

export default YourInfo;
