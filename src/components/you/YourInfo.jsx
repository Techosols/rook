import FormSection from "../ui/FormSection";
import { BadgeInfo, Check, LucideBadgeInfo } from "lucide-react";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Select from "../ui/Select";
import Radio from "../ui/Radio";

function YourInfo() {
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
                <Input placeholder="What do you want to be called?" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="lastName">Age</label>
                <Input placeholder="Age" type="number" disabled={true} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="location">ZipCode</label>
                <Input placeholder="Your Location" disabled={true} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="height">Height</label>
                <div className="flex flex-col lg:flex-row gap-2">
                    <Input placeholder="Feet" type="number" />
                    <Input placeholder="Inches" type="number" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="weight">Moniker</label>
                <Input placeholder="Moniker" disabled={true} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="bodyType">Weight <span className="text-gray-500">{"("} in pounds {")"}</span></label>
                <Input placeholder="Weight" type="number" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-medium dark:text-white" htmlFor="bodyType">Relationship Types</label>
                <div className="flex flex-col gap-1 h-30 overflow-y-auto border border-gray-300 dark:border-gray-600 p-2 rounded">
                    {[1, 2, 3, 4].map((type) => (
                        <Checkbox key={type} label={`Option ${type}`} />
                    ))}
                </div>
            </div>
            
        </div>
      </FormSection>
      <FormSection title="About You">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Gender">Gender</label>
                <Select options={["Male", "Female", "Other"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="RelationshipStatus">Relationship Status</label>
                <Select options={["Single", "In a Relationship", "Married", "Divorced"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Ethnicity">Ethnicity</label>
                <Select options={["Asian", "Black", "Hispanic", "White", "Other"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Religion">Religion</label>
                <Select options={["Christianity", "Islam", "Judaism", "Buddhism", "Other"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="EducationLevel">Education Level</label>
                <Select options={["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctorate"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Occupation">Occupation</label>
                <Select options={["Employed", "Unemployed", "Student", "Retired"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="PoliticalAffliation">Political Affiliation</label>
                <Select options={["Democrat", "Republican", "Independent", "Other"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="SexualOrientation">Sexual Orientation</label>
                <Select options={["Heterosexual", "Homosexual", "Bisexual", "Other"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Asexual">Asexual</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="asexual" />
                    <Radio label="No" name="asexual" />
                </div>
            </div>
        </div>
      </FormSection>
      <FormSection title="Kids/Pets">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Kids">Do you have kids?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="kids" />
                    <Radio label="No" name="kids" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="wantKids">Do you want kids in the future?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="wantKids" />
                    <Radio label="No" name="wantKids" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="Pets">Do you have pets now?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="pets" />
                    <Radio label="No" name="pets" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="wantPets">Do you want pets in the future?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="wantPets" />
                    <Radio label="No" name="wantPets" />
                </div>
            </div>
        </div>
      </FormSection>
      <FormSection title="Physical Activity">
        <p className="text-gray-400 text-sm flex gap-2 items-center"><span><BadgeInfo /></span> We use this data to compute a "physical activity index" for you that other users can filter by</p>
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseFrequency">Frequency</label>
                <Select options={["Never", "Rarely", "Sometimes", "Often", "Always"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseIntensity">Intensity</label>
                <Select options={["Low", "Moderate", "High"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseDuration">Duration</label>
                <Select options={["Less than 30 minutes", "30-60 minutes", "More than 60 minutes"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="exerciseLength">Length</label>
                <Select options={["Short", "Medium", "Long"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-start h-20">
                <label className="font-medium dark:text-white" htmlFor="exerciseType">Type</label>
                <div className=" flex flex-col border border-gray-300 dark:border-gray-600 p-2 rounded mb-1">
                    <Checkbox label="Cardio" />
                    <Checkbox label="Strength" />
                    <Checkbox label="Flexibility" />
                    <Checkbox label="Balance" />
                </div>
            </div>

        </div>
      </FormSection>
      <FormSection title="Health/Habits">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="smoke">Are you a smoker?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="smoke" />
                    <Radio label="No" name="smoke" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="recDrug">Do you use rec drugs?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="recDrug" />
                    <Radio label="No" name="recDrug" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="disability">Disabilities?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="disability" />
                    <Radio label="No" name="disability" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="stdSti">STDs/STIs</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="stdSti" />
                    <Radio label="No" name="stdSti" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="alcoholConsumptionFrequency">Alcohol Consumption Frequency</label>
                <Select options={["Never", "Rarely", "Sometimes", "Often", "Always"]} />
            </div>
        </div>
      </FormSection>
      <FormSection title="Misc">
        <div className="flex flex-col gap-2 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="loveLang">Your love language</label>
                <Select options={["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="starSign">Your Star Sign</label>
                <Select options={["Scorpio", "Option2", "Option3"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-1 md:gap-2 items-center">
                <label className="font-medium dark:text-white" htmlFor="includeInRandomMatches">Include you in Random Matches?</label>
                <div className="flex items-center gap-2">
                    <Radio label="Yes" name="includeInRandomMatches" />
                    <Radio label="No" name="includeInRandomMatches" />
                </div>
            </div>
        </div>
      </FormSection>
    </div>
  );
}

export default YourInfo;
