import ProfileContext from "./ProfileContext";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { useAuth0 } from "@auth0/auth0-react";

function ProfileProvider({ children }) {
  const { token } = useAuth();
  const { isAuthenticated } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [physicalActivity, setPhysicalActivty] = useState([]);

  // Field to hold the data
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
  const [asexual, setAsexual] = useState(null);
  const [hasKids, setHasKids] = useState(null);
  const [wantsKids, setWantsKids] = useState(null);
  const [hasPets, setHasPets] = useState(null);
  const [wantsPets, setWantsPets] = useState(null);
  const [exerciseFrequency, setExerciseFrequency] = useState(null);
  const [exerciseIntensity, setExerciseIntensity] = useState(null);
  const [exerciseDuration, setExerciseDuration] = useState(null);
  const [exerciseLength, setExerciseLength] = useState(null);
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

  const [aboutMe, setAboutMe] = useState("");

  const api = useAuthenticatedApi();

  function setProfileField(field, value) {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  }

  function updateProfile(updates) {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updates,
    }));
  }

  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      try {
        setIsProfileLoading(true);
        const [profileRes, activityRes] = await Promise.all([
          api.get("V1/profile"),
          api.get("V1/physical-activity"),
        ]);
        setProfile(profileRes.data);
        setPhysicalActivty(activityRes.data);
      } catch (error) {
        console.error("Error fetching profile or activity:", error);
        setProfileError(error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAll();
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    if (!isProfileLoading && profile) {
      setPreferredName(profile?.preferredName || "");
      setHeightFeet(profile?.heightFeet || "");
      if (profile?.heightInInches) {
        const totalInches = profile.heightInInches;
        setHeightFeet(Math.floor(totalInches / 12).toString());
        setHeightInches((totalInches % 12).toString());
      } else {
        setHeightFeet(profile?.heightFeet || 2);
        setHeightInches(profile?.heightInInches || 0);
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
      setAsexual(profile?.asexual ?? null);
      setHasKids(profile?.hasKidsNow ?? null);
      setWantsKids(profile?.wantOwnKids ?? null);
      setHasPets(profile?.hasPetsNow ?? null);
      setWantsPets(profile?.wantOwnPets ?? null);
      setSmoke(profile?.isSmoker || false);
      setRecDrug(profile?.isRecreationalDrugUser || false);
      setDisability(profile?.hasDisability || false);
      setStdSti(profile?.hasSexuallyTransmittedInfection || false);
      setDrinks(profile?.alcoholConsumptionFrequency || "");
      setLoveLanguage(profile?.loveLanguage || "");
      setStarSign(profile?.starSign || "");
      setIncludeInRandomMatches(profile?.includeInRandomMatches || false);

      setAboutMe(profile?.aboutMe || "");
    }
  }, [profile, isProfileLoading]);

  const values = {
    profile,
    isProfileLoading,
    isProfileUpdating,
    profileError,
    setProfile,
    setProfileField,
    updateProfile,
    setIsProfileUpdating,
    physicalActivity,
    setPhysicalActivty,
    // Individual fields
    preferredName,
    setPreferredName,
    age,
    setAge,
    zipCode,
    setZipCode,
    heightFeet,
    setHeightFeet,
    heightInches,
    setHeightInches,
    weight,
    setWeight,
    moniker,
    setMoniker,
    relationshipType,
    setRelationshipType,
    gender,
    setGender,
    relationshipStatus,
    setRelationshipStatus,
    ethnicity,
    setEthnicity,
    religion,
    setReligion,
    educationLevel,
    setEducationLevel,
    occupation,
    setOccupation,
    politicalAffiliation,
    setPoliticalAffiliation,
    sexualOrientation,
    setSexualOrientation,
    asexual,
    setAsexual,
    hasKids,
    setHasKids,
    wantsKids,
    setWantsKids,
    hasPets,
    setHasPets,
    wantsPets,
    setWantsPets,
    exerciseFrequency,
    setExerciseFrequency,
    exerciseIntensity,
    setExerciseIntensity,
    exerciseDuration,
    setExerciseDuration,
    exerciseLength,
    setExerciseLength,
    exerciseType,
    setExerciseType,
    exerciseIndex,
    setExerciseIndex,
    smoke,
    setSmoke,
    recDrug,
    setRecDrug,
    disability,
    setDisability,
    stdSti,
    setStdSti,
    drinks,
    setDrinks,
    loveLanguage,
    setLoveLanguage,
    starSign,
    setStarSign,
    includeInRandomMatches,
    setIncludeInRandomMatches,
    aboutMe,
    setAboutMe,
  };

  return (
    <ProfileContext.Provider value={values}>{children}</ProfileContext.Provider>
  );
}

export default ProfileProvider;
