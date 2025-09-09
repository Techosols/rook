import FormSection from "../ui/FormSection";
import { BadgeInfo, Check, LucideBadgeInfo } from "lucide-react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Select from "../ui/Select";
import Radio from "../ui/Radio";

import { useState } from "react";

function YourInfo() {

    // States
    const [preferredName, setPreferredName] = useState("");
    const [age] = useState("");
    const [zipCode] = useState("");
    const [heightFeet, setHeightFeet] = useState("");
    const [heightInches, setHeightInches] = useState("");
    const [weight, setWeight] = useState("");
    const [moniker, setMoniker] = useState("");
    const [relationshipTypes, setRelationshipTypes] = useState([{ id: 1, name: "Single", checked: false }, { id: 2, name: "In a relationship", checked: false }, { id: 3, name: "Married", checked: false }, { id: 4, name: "It's complicated", checked: false }]); // Example options
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
    const [exerciseType, setExerciseType] = useState([{ id: 1, name: "Cardio", checked: false }, { id: 2, name: "Strength", checked: false }, { id: 3, name: "Flexibility", checked: false }, { id: 4, name: "Balance", checked: false }]); // Example options
    const [smoke, setSmoke] = useState(false);
    const [recDrug, setRecDrug] = useState(false);
    const [disability, setDisability] = useState(false);
    const [stdSti, setStdSti] = useState(false);
    const [drinks, setDrinks] = useState("");
    const [loveLanguage, setLoveLanguage] = useState("");
    const [starSign, setStarSign] = useState("");
    const [includeInRandomMatches, setIncludeInRandomMatches] = useState(true);

    //External
    const [selectedExerciseTypes, setSelectedExerciseTypes] = useState([]);

    // Handles
    function handleExerciseTypeChange(type) {
        if (selectedExerciseTypes.includes(type)) {
            setSelectedExerciseTypes(selectedExerciseTypes.filter((t) => t !== type));
        } else {
            setSelectedExerciseTypes([...selectedExerciseTypes, type]);
        }
    }

  return (
    <div className="p-1 flex flex-col gap-1 md:gap-4">
      <p className="text-sm text-gray-600">
        <span>
            <LucideBadgeInfo className="inline mb-1 mr-1" size={16} />
        </span>
        In this page, you provide info about yourself that can be used by others
        in filters, to include/exclude you in their matches.
      </p>
      <FormSection title="You">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="firstName">Preferred Name</label>
                <Input placeholder="What do you want to be called?" value={preferredName} onChange={(e) => setPreferredName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="lastName">Age</label>
                <Input placeholder="Age" type="number" value={age} disabled={true} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="location">ZipCode</label>
                <Input placeholder="Your Location" value={zipCode} disabled={true} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="height">Height</label>
                <div className="flex flex-col lg:flex-row gap-2">
                    <Input placeholder="Feet" type="number" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} />
                    <Input placeholder="Inches" type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="weight">Moniker</label>
                <Input placeholder="Moniker" disabled={true} value={moniker} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="bodyType">Weight <span className="text-gray-500">{"("} in pounds {")"}</span></label>
                <Input placeholder="Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="bodyType">Relationship Types</label>
                <div className="flex flex-col gap-1 h-30 overflow-y-auto border border-gray-300 dark:border-gray-600 p-2 rounded">
                    {relationshipTypes.map((type) => (
                        <Checkbox key={type.id} label={type.name} onChange={() => {
                            setRelationshipTypes((prev) =>
                                prev.map((item) =>
                                    item.id === type.id ? { ...item, checked: !item.checked } : item
                                )
                            );
                        }} />
                    ))}
                </div>
            </div>
            
        </div>
      </FormSection>
      <FormSection title="About You">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Gender">Gender</label>
                <Select options={["Male", "Female", "Other"]} value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="RelationshipStatus">Relationship Status</label>
                <Select options={["Single", "In a Relationship", "Married", "Divorced"]} value={relationshipStatus} onChange={(e) => setRelationshipStatus(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Ethnicity">Ethnicity</label>
                <Select options={["Asian", "Black", "Hispanic", "White", "Other"]} value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Religion">Religion</label>
                <Select options={["Christianity", "Islam", "Judaism", "Buddhism", "Other"]} value={religion} onChange={(e) => setReligion(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="EducationLevel">Education Level</label>
                <Select options={["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctorate"]} value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Occupation">Occupation</label>
                <Select options={["Employed", "Unemployed", "Student", "Retired"]} value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="PoliticalAffliation">Political Affiliation</label>
                <Select options={["Democrat", "Republican", "Independent", "Other"]} value={politicalAffiliation} onChange={(e) => setPoliticalAffiliation(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="SexualOrientation">Sexual Orientation</label>
                <Select options={["Heterosexual", "Homosexual", "Bisexual", "Other"]} value={sexualOrientation} onChange={(e) => setSexualOrientation(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Asexual">Asexual</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="asexual" checked={asexual === true} onChange={() => setAsexual(true)} />
                    <Radio label="No" name="asexual" checked={asexual === false} onChange={() => setAsexual(false)} />
                </div>
            </div>
        </div>
      </FormSection>
      <FormSection title="Kids/Pets">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Kids">Do you have kids?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="kids" checked={hasKids === true} onChange={() => setHasKids(true)} />
                    <Radio label="No" name="kids" checked={hasKids === false} onChange={() => setHasKids(false)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="wantKids">Do you want kids in the future?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="wantKids" checked={wantsKids === true} onChange={() => setWantsKids(true)} />
                    <Radio label="No" name="wantKids" checked={wantsKids === false} onChange={() => setWantsKids(false)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Pets">Do you have pets now?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="pets" checked={hasPets === true} onChange={() => setHasPets(true)} />
                    <Radio label="No" name="pets" checked={hasPets === false} onChange={() => setHasPets(false)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="wantPets">Do you want pets in the future?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="wantPets" checked={wantsPets === true} onChange={() => setWantsPets(true)} />
                    <Radio label="No" name="wantPets" checked={wantsPets === false} onChange={() => setWantsPets(false)} />
                </div>
            </div>
        </div>
      </FormSection>
      <FormSection title="Physical Activity">
        <p className="text-gray-400 text-sm flex gap-2 items-center"><span><BadgeInfo /></span> We use this data to compute a "physical activity index" for you that other users can filter by</p>
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseFrequency">Frequency</label>
                <Select options={["Never", "Rarely", "Sometimes", "Often", "Always"]} value={exerciseFrequency} onChange={setExerciseFrequency} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseIntensity">Intensity</label>
                <Select options={["Low", "Moderate", "High"]} value={exerciseIntensity} onChange={setExerciseIntensity} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseDuration">Duration</label>
                <Select options={["Less than 30 minutes", "30-60 minutes", "More than 60 minutes"]} value={exerciseDuration} onChange={setExerciseDuration} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseLength">Length</label>
                <Select options={["Short", "Medium", "Long"]} value={exerciseLength} onChange={setExerciseLength} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-start h-20">
                <label className="font-medium dark:text-white" htmlFor="exerciseType">Type</label>
                <div className=" flex flex-col border border-gray-300 dark:border-gray-600 p-2 rounded mb-1">
                    {exerciseType.length === 0 && <p className="text-sm text-gray-500 mb-1">Select all that apply</p>}
                    {exerciseType.length > 0 && <p className="text-sm text-gray-500 mb-1">Selected: {exerciseType.join(", ")}</p>}
                    {exerciseType.map((type) => (
                        <Checkbox key={type.id} label={type.name} checked={selectedExerciseTypes.includes(type.name)} onChange={() => handleExerciseTypeChange(type.name)} />
                    ))}
                </div>
            </div>

        </div>
      </FormSection>
      <FormSection title="Health/Habits">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="smoke">Are you a smoker?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="smoke" checked={smoke === true} onChange={() => setSmoke(true)} />
                    <Radio label="No" name="smoke" checked={smoke === false} onChange={() => setSmoke(false)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="recDrug">Do you use rec drugs?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="recDrug" checked={recDrug === true} onChange={() => setRecDrug(true)} />
                    <Radio label="No" name="recDrug" checked={recDrug === false} onChange={() => setRecDrug(false)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="disability">Disabilities?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="disability" checked={disability === true} onChange={() => setDisability(true)} />
                    <Radio label="No" name="disability" checked={disability === false} onChange={() => setDisability(false)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="stdSti">STDs/STIs</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="stdSti" checked={stdSti === true} onChange={() => setStdSti(true)} />
                    <Radio label="No" name="stdSti" checked={stdSti === false} onChange={() => setStdSti(false)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="alcoholConsumptionFrequency">Alcohol Consumption Frequency</label>
                <Select options={["Never", "Rarely", "Sometimes", "Often", "Always"]} value={drinks} onChange={setDrinks} />
            </div>
        </div>
      </FormSection>
      <FormSection title="Misc">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="loveLang">Your love language</label>
                <Select options={["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"]} value={loveLanguage} onChange={setLoveLanguage} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="starSign">Your Star Sign</label>
                <Select options={["Scorpio", "Option2", "Option3"]} value={starSign} onChange={setStarSign} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="includeInRandomMatches">Include you in Random Matches?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="includeInRandomMatches" checked={includeInRandomMatches === true} onChange={() => setIncludeInRandomMatches(true)} />
                    <Radio label="No" name="includeInRandomMatches" checked={includeInRandomMatches === false} onChange={() => setIncludeInRandomMatches(false)} />
                </div>
            </div>
        </div>
      </FormSection>
    </div>
  );
}

export default YourInfo;
