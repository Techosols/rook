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

function YourInfo() {
  const { profile, isProfileLoading } = useProfile();
  const {
    educationLevels,
    genders,
    relationshipStatuses,
    relationshipTypes,
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
  } = useOption();

  // States
  const [preferredName, setPreferredName] = useState("");
  const [age, setAge] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [moniker, setMoniker] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
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
  const [smoke, setSmoke] = useState(false);
  const [recDrug, setRecDrug] = useState(false);
  const [disability, setDisability] = useState(false);
  const [stdSti, setStdSti] = useState(false);
  const [drinks, setDrinks] = useState("");
  const [loveLanguage, setLoveLanguage] = useState("");
  const [starSign, setStarSign] = useState("");
  const [includeInRandomMatches, setIncludeInRandomMatches] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  async function updateYouSection() {
    try {
      setLoading(true);
      await userService.updateUserProfile({
        preferredName: preferredName,
        heightInInches:
          (parseInt(heightFeet) || 0) * 12 + (parseInt(heightInches) || 0),
        weight: weight,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateAboutYouSection() {
    try {
      setLoading(true);
      await userService.updateUserProfile({
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
      setLoading(false);
    }
  }

  async function updateKidsPetsSection() {
    try {
      setLoading(true);
      await userService.updateUserProfile({
        hasKidsNow: hasKids,
        wantOwnKids: wantsKids,
        hasPetsNow: hasPets,
        wantOwnPets: wantsPets,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updatePhysicalActivitySection() {
    try {
      setLoading(true);
      await userService.updateUserProfile({
        exerciseFrequency: exerciseFrequency,
        exerciseIntensity: exerciseIntensity,
        exerciseDuration: exerciseDuration,
        exerciseLength: exerciseLength,
        exerciseType: exerciseType,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateHealthHabitsSection() {
    try {
      setLoading(true);
      await userService.updateUserProfile({
        isSmoker: smoke,
        isRecreationalDrugUser: recDrug,
        hasDisability: disability,
        hasSexuallyTransmittedInfection: stdSti,
        alcoholConsumptionFrequency: drinks,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateMiscSection() {
    try {
      setLoading(true);
      await userService.updateUserProfile({
        loveLanguage: loveLanguage,
        starSign: starSign,
        includeInRandomMatches: includeInRandomMatches,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
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
        setHeightFeet(profile?.heightFeet || "");
        setHeightInches(profile?.heightInInches || "0");
      }
      setWeight(profile?.weight || "");
      setMoniker(profile?.moniker || "");
      setAge(profile?.ageInYears || "");
      setZipCode(profile?.postalCode || "");
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
      setWantsPets(profile?.wantsPets || true);
      setExerciseFrequency(profile?.exerciseFrequency || "");
      setExerciseIntensity(profile?.exerciseIntensity || "");
      setExerciseDuration(profile?.exerciseDuration || "");
      setExerciseLength(profile?.exerciseLength || "");
      setSmoke(profile?.isSmoker || false);
      setRecDrug(profile?.isRecreationalDrugUser || false);
      setDisability(profile?.hasDisability || false);
      setStdSti(profile?.hasSexuallyTransmittedInfection || false);
      setDrinks(profile?.alcoholConsumptionFrequency || "");
      setLoveLanguage(profile?.loveLanguage || "");
      setStarSign(profile?.starSign || "");
      setIncludeInRandomMatches(profile?.includeInRandomMatches || false);
    }
  }, [profile]);

  return (
    <div className="p-1 flex flex-col gap-1 md:gap-4">
      <p className="text-sm text-gray-600">
        <span>
          <LucideBadgeInfo className="inline mb-1 mr-1" size={16} />
        </span>
        In this page, you provide info about yourself that can be used by others
        in filters, to include/exclude you in their matches.
      </p>
      <FormSection
        title="You"
        onSave={() => updateYouSection()}
        loading={loading}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="firstName">
              Preferred Name
            </label>
            <Input
              placeholder="What do you want to be called?"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="lastName">
              Age
            </label>
            <Input
              placeholder="Age"
              type="number"
              value={age}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="location">
              ZipCode
            </label>
            <Input
              placeholder="Your Location"
              value={zipCode}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="height">
              Height
            </label>
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
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="weight">
              Moniker
            </label>
            <Input placeholder="Moniker" disabled={true} value={moniker} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="bodyType">
              Weight{" "}
              <span className="text-gray-500">
                {"("} in pounds {")"}
              </span>
            </label>
            <Input
              placeholder="Weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium dark:text-white" htmlFor="bodyType">
              Relationship Types | {relationshipType}
            </label>
            <div className="flex flex-col gap-1 h-30 overflow-y-auto border border-gray-300 dark:border-gray-600 p-2 rounded">
              {Object.values(relationshipTypes).map((type, idx) => (
                <Checkbox
                  key={idx}
                  label={type}
                  onChange={() => {
                    setRelationshipType((prev) =>
                      prev.includes(type)
                        ? prev.filter((item) => item !== type)
                        : [...prev, type]
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </FormSection>
      <FormSection
        title="About You"
        onSave={() => updateAboutYouSection()}
        loading={loading}
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Gender">
              Gender
            </label>
            <Select
              options={genders}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Select Gender"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="RelationshipStatus"
            >
              Relationship Status
            </label>
            <Select
              options={relationshipStatuses}
              value={relationshipStatus}
              onChange={(e) => setRelationshipStatus(e.target.value)}
              placeholder="Select Relationship Status"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Ethnicity">
              Ethnicity
            </label>
            <Select
              options={ethnicities}
              value={ethnicity}
              onChange={(e) => setEthnicity(e.target.value)}
              placeholder="Select Ethnicity"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Religion">
              Religion
            </label>
            <Select
              options={religions}
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              placeholder="Select Religion"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="EducationLevel"
            >
              Education Level
            </label>
            <Select
              options={educationLevels}
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              placeholder="Select Education Level"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Occupation">
              Occupation
            </label>
            <Select
              options={occupationProfiles}
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="Select Occupation"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="PoliticalAffliation"
            >
              Political Affiliation
            </label>
            <Select
              options={politicalAffiliations}
              value={politicalAffiliation}
              onChange={(e) => setPoliticalAffiliation(e.target.value)}
              placeholder="Select Political Affiliation"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="SexualOrientation"
            >
              Sexual Orientation
            </label>
            <Select
              options={orientations}
              value={sexualOrientation}
              onChange={(e) => setSexualOrientation(e.target.value)}
              placeholder="Select Sexual Orientation"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Asexual">
              Asexual{" "}
            </label>
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
          </div>
        </div>
      </FormSection>
      <FormSection
        title="Kids/Pets"
        onSave={() => updateKidsPetsSection()}
        loading={loading}
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Kids">
              Do you have kids?
            </label>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="wantKids">
              Do you want kids in the future?
            </label>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="Pets">
              Do you have pets now?
            </label>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="wantPets">
              Do you want pets in the future?
            </label>
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
          </div>
        </div>
      </FormSection>
      <FormSection title="Physical Activity">
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
            <Select
              options={physicalActivityFrequencies}
              value={exerciseFrequency}
              onChange={(e) => setExerciseFrequency(e.target.value)}
              placeholder="Select Frequency"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseIntensity"
            >
              Intensity
            </label>
            <Select
              options={physicalActivityIntensities}
              value={exerciseIntensity}
              onChange={(e) => setExerciseIntensity(e.target.value)}
              placeholder="Select Intensity"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseDuration"
            >
              Duration
            </label>
            <Select
              options={physicalActivityDurations}
              value={exerciseDuration}
              onChange={(e) => setExerciseDuration(e.target.value)}
              placeholder="Select Duration"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseLength"
            >
              Length
            </label>
            <Select
              options={physicalActivityLengths}
              value={exerciseLength}
              onChange={(e) => setExerciseLength(e.target.value)}
              placeholder="Select Length"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-start h-20">
            <label
              className="font-medium dark:text-white"
              htmlFor="exerciseType"
            >
              Type
            </label>
            <div className="flex flex-col h-32 overflow-y-scroll border border-gray-300 dark:border-gray-600 p-2 rounded mb-1">
              {Object.values(physicalActivityTypes).map((type, idx) => (
                <Checkbox
                  key={idx}
                  label={type}
                  checked={exerciseType.includes(type)}
                  onChange={() => {
                    setExerciseType((prev) =>
                      prev.includes(type)
                        ? prev.filter((item) => item !== type)
                        : [...prev, type]
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </FormSection>
      <FormSection title="Health/Habits" onSave={() => updateHealthHabitsSection()} loading={loading}>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="smoke">
              Are you a smoker?
            </label>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="recDrug">
              Do you use rec drugs?
            </label>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="disability">
              Disabilities?
            </label>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="stdSti">
              STDs/STIs
            </label>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="alcoholConsumptionFrequency"
            >
              Alcohol Consumption Frequency | {drinks}
            </label>
            <Select
              options={alcoholConsumptionFrequencies}
              value={drinks}
              onChange={(e) => setDrinks(e.target.value)}
            />
          </div>
        </div>
      </FormSection>
      <FormSection
        title="Misc"
        onSave={() => updateMiscSection()}
        loading={loading}
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="loveLang">
              Your love language
            </label>
            <Select
              options={loveLanguages}
              value={loveLanguage}
              onChange={(e) => setLoveLanguage(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label className="font-medium dark:text-white" htmlFor="starSign">
              Your Star Sign
            </label>
            <Select
              options={starSigns}
              value={starSign}
              onChange={(e) => setStarSign(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
            <label
              className="font-medium dark:text-white"
              htmlFor="includeInRandomMatches"
            >
              Include you in Random Matches?
            </label>
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
          </div>
        </div>
      </FormSection>
    </div>
  );
}

export default YourInfo;
