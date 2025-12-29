import FilterContext from "./FilterContext";
import { useEffect, useState } from "react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { toast } from "react-toastify";
import useProfile from "../../hooks/useProfile";
import useOption from "../../hooks/useOption";

const FilterProvider = ({ children }) => {

    const [singleChoiceFilters, setSingleChoiceFilters] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { zipCode, setZipCode } = useProfile();
    const api = useAuthenticatedApi();
    const { occupationProfiles = {} } = useOption();

    // Occupation States
    const [mergedExcludedOccupations, setMergedExcludedOccupations] = useState([]);
    const [mergedIncludedOccupations, setMergedIncludedOccupations] = useState([]);

    // Validation States
    const [filtersLastUpdated, setFiltersLastUpdated] = useState(null);
    const [isWeightInPounds, setIsWeightInPounds] = useState(null);
    const [isRadiusInMiles, setIsRadiusInMiles] = useState(null);

    // States and Setters
    const [distance, setDistance] = useState("");
    const [ageFrom, setAgeFrom] = useState("");
    const [ageTo, setAgeTo] = useState("");
    const [heightFromFeet, setHeightFromFeet] = useState("");
    const [heightFromInches, setHeightFromInches] = useState("");
    const [heightToFeet, setHeightToFeet] = useState("");
    const [heightToInches, setHeightToInches] = useState("");
    const [weightFrom, setWeightFrom] = useState("");
    const [weightTo, setWeightTo] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [excludePeopleHaveKids, setExcludePeopleHaveKids] = useState(null);
    const [excludePeopleWantKids, setExcludePeopleWantKids] = useState(null);
    const [excludePeopleHavePets, setExcludePeopleHavePets] = useState(null);
    const [excludePeopleWantPets, setExcludePeopleWantPets] = useState(null);
    const [excludeAsexualPeople, setExcludeAsexualPeople] = useState(null);
    const [excludeDisablingPeople, setExcludeDisablingPeople] = useState(null);
    const [excludeSTIsPeople, setExcludeSTIsPeople] = useState(null);
    const [excludeSmokers, setExcludeSmokers] = useState(null);
    const [excludeRecreationalDrugUsers, setExcludeRecreationalDrugUsers] = useState(null);
    const [maximumAlcoholConsumption, setMaximumAlcoholConsumption] = useState("");
    const [excludeEthnicities, setExcludeEthnicities] = useState([]);
    const [excludeReligions, setExcludeReligions] = useState([]);
    const [excludeBackgroundCheckStatus, setExcludeBackgroundCheckStatus] = useState([]);
    const [excludeGenders, setExcludeGenders] = useState([]);
    const [excludeSexualOrientations, setExcludeSexualOrientations] = useState([]);
    const [excludeRelationshipTypes, setExcludeRelationshipTypes] = useState([]);
    const [excludePoliticalAffiliations, setExcludePoliticalAffiliations] = useState([]);
    const [excludePhysicalActivityIndexes, setExcludePhysicalActivityIndexes] = useState([]);
    const [includeOccupations, setIncludeOccupations] = useState([]);
    const [excludeOccupations, setExcludeOccupations] = useState([]);


    // Saving Loaders
    const [isSavingLocation, setIsSavingLocation] = useState(false);
    const [isSavingStats, setIsSavingStats] = useState(false);
    const [isSavingKidsPets, setIsSavingKidsPets] = useState(false);
    const [isSavingHealthHabits, setIsSavingHealthHabits] = useState(false);
    const [isSavingEthnicities, setIsSavingEthnicities] = useState(false);
    const [isSavingReligions, setIsSavingReligions] = useState(false);
    const [isSavingBackgroundCheckStatus, setIsSavingBackgroundCheckStatus] = useState(false);
    const [isSavingGenders, setIsSavingGenders] = useState(false);
    const [isSavingSexualOrientations, setIsSavingSexualOrientations] = useState(false);
    const [isSavingRelationshipTypes, setIsSavingRelationshipTypes] = useState(false);
    const [isSavingPoliticalAffiliations, setIsSavingPoliticalAffiliations] = useState(false);
    const [isSavingPhysicalActivityIndexes, setIsSavingPhysicalActivityIndexes] = useState(false);
    const [isSavingIncludedOccupations, setIsSavingIncludedOccupations] = useState(false);
    const [isSavingExcludedOccupations, setIsSavingExcludedOccupations] = useState(false);

    // Merge occupation profiles with included and excluded occupations
    useEffect(() => {
        async function mergeOccupations() {

            if(!occupationProfiles || Object.keys(occupationProfiles).length === 0) return;

            const formattedExcludedOccupations = await Object.entries(occupationProfiles).map(([id, occ]) => ({ id, name: occ, excluded: false }));
            const formattedIncludedOccupations = await Object.entries(occupationProfiles).map(([id, occ]) => ({ id, name: occ, excluded: true }));

            const mergedIncludedOccupationsResult = await formattedIncludedOccupations.map((occupation) => {
                const updated = includeOccupations.find((inc) => inc.id === occupation.id);
                return updated ? { ...occupation, excluded: false } : occupation;
            })
            setMergedIncludedOccupations(mergedIncludedOccupationsResult);

            const mergedExcludedOccupationsResult = await formattedExcludedOccupations.map((occupation) => {
                const updated = excludeOccupations.find((exc) => exc.id === occupation.id);
                return updated ? { ...occupation, excluded: true } : occupation;
            })
            setMergedExcludedOccupations(mergedExcludedOccupationsResult);
        }
        mergeOccupations();
    }, [occupationProfiles]);



    // Fetch initial filters when API becomes available
    useEffect(() => {
        if (!api) {
            setIsLoading(true);
            return; // Wait for API to be available
        }

        const fetchInitialFilters = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [
                    singleChoiceFilterRes,
                    backgroundCheckRes,
                    ethnicityRes,
                    excludedoccupationRes,
                    genderRes,
                    includedoccupationRes,
                    orientationRes,
                    physicalActivityIndexRes,
                    politicalAffiliationRes,
                    relationshipTypeRes,
                    religionRes
                ] = await Promise.all([
                    api.get('/v1/filter/other'),
                    api.get('/v1/filter/backgroundcheckstatus'),
                    api.get('/v1/filter/ethnicity'),
                    api.get('/v1/filter/excludedoccupation'),
                    api.get('/v1/filter/gender'),
                    api.get('/v1/filter/includedoccupation'),
                    api.get('/v1/filter/orientation'),
                    api.get('/v1/filter/physicalactivityindex'),
                    api.get('/v1/filter/politicalaffiliation'),
                    api.get('/v1/filter/relationshiptype'),
                    api.get('/v1/filter/religion'),
                ]);

                setSingleChoiceFilters(singleChoiceFilterRes.data);
                setExcludeBackgroundCheckStatus(backgroundCheckRes.data);
                setExcludeEthnicities(ethnicityRes.data);
                setExcludeOccupations(excludedoccupationRes.data);
                setExcludeGenders(genderRes.data);
                setIncludeOccupations(includedoccupationRes.data);
                setExcludeSexualOrientations(orientationRes.data);
                setExcludePhysicalActivityIndexes(physicalActivityIndexRes.data);
                setExcludePoliticalAffiliations(politicalAffiliationRes.data);
                setExcludeRelationshipTypes(relationshipTypeRes.data);
                setExcludeReligions(religionRes.data);

            } catch (error) {
                console.error("Error fetching initial filters:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialFilters();
    }, [api]);

    // Populate individual filter states from fetched metadata
    useEffect(() => {
        if (!singleChoiceFilters || Object.keys(singleChoiceFilters).length === 0) return;

        setDistance(singleChoiceFilters.postalCodeWithinRadius || "");
        setAgeFrom(singleChoiceFilters.ageFrom || "");
        setAgeTo(singleChoiceFilters.ageTo || "");
        setWeightFrom(singleChoiceFilters.weightFrom || "");
        setWeightTo(singleChoiceFilters.weightTo || "");
        setHeightFromFeet(singleChoiceFilters.heightFrom ? Math.floor(singleChoiceFilters.heightFrom / 12) : "");
        setHeightFromInches(singleChoiceFilters.heightFrom ? singleChoiceFilters.heightFrom % 12 : "");
        setHeightToFeet(singleChoiceFilters.heightTo ? Math.floor(singleChoiceFilters.heightTo / 12) : "");
        setHeightToInches(singleChoiceFilters.heightTo ? singleChoiceFilters.heightTo % 12 : "");
        setEducationLevel(singleChoiceFilters.minimumEducationLevel || "");
        setExcludePeopleHaveKids(singleChoiceFilters.excludePersonsWithKidsNow);
        setExcludePeopleWantKids(singleChoiceFilters.excludePersonsWhoWantOwnKids);
        setExcludePeopleHavePets(singleChoiceFilters.excludePersonsWithPetsNow);
        setExcludePeopleWantPets(singleChoiceFilters.excludePersonsWhoWantOwnPets);
        setExcludeAsexualPeople(singleChoiceFilters.excludeAsexualPersons);
        setExcludeDisablingPeople(singleChoiceFilters.excludeDisabledPersons);
        setExcludeSTIsPeople(singleChoiceFilters.excludeSTIPersons);
        setExcludeSmokers(singleChoiceFilters.excludeSmokers);
        setExcludeRecreationalDrugUsers(singleChoiceFilters.excludeRecreationalDrugUsers);
        setMaximumAlcoholConsumption(singleChoiceFilters.maximumAcceptableAlcoholConsumptionFrequency || "");
        setFiltersLastUpdated(singleChoiceFilters.lastUpdated);
        setIsRadiusInMiles(singleChoiceFilters.isRadiusInMiles);
        setIsWeightInPounds(singleChoiceFilters.isWeightInPounds);
    }, [singleChoiceFilters]);

    const saveLocation = async () => {
        if (!api) return;
        setIsSavingLocation(true);
        await Promise.all([
            api.patch('/v1/profile', {
                postalCode: zipCode,
            }),
            api.patch('/v1/filter/other', {
                postalCodeWithinRadius: distance,
            })
        ]).then(() => {
            toast.success("Location filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving location filters: " + error.message);
        }).finally(() => {
            setIsSavingLocation(false);
        });
    };

    const saveStats = async () => {
        if (!api) return;
        setIsSavingStats(true);
        await api.patch('/v1/filter/other', {
            ageFrom: ageFrom,
            ageTo: ageTo,
            weightFrom: weightFrom,
            weightTo: weightTo,
            heightFrom: heightFromFeet * 12 + heightFromInches,
            heightTo: heightToFeet * 12 + heightToInches,
            minimumEducationLevel: educationLevel,
        }).then(() => {
            toast.success("Stat filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving stat filters: " + error.message);
        }).finally(() => {
            setIsSavingStats(false);
        });
    };

    const saveKidsPets = async () => {
        if (!api) return;
        setIsSavingKidsPets(true);
        await api.patch('/v1/filter/other', {
            excludePersonsWithKidsNow: excludePeopleHaveKids,
            excludePersonsWhoWantOwnKids: excludePeopleWantKids,
            excludePersonsWithPetsNow: excludePeopleHavePets,
            excludePersonsWhoWantOwnPets: excludePeopleWantPets,
        }).then(() => {
            toast.success("Kids and Pets filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Kids and Pets filters: " + error.message);
        }).finally(() => {
            setIsSavingKidsPets(false);
        });
    };

    const saveHealthHabits = async () => {
        if (!api) return;
        setIsSavingHealthHabits(true);
        await api.patch('/v1/filter/other', {
            excludeAsexualPersons: excludeAsexualPeople,
            excludeDisabledPersons: excludeDisablingPeople,
            excludeSTIPersons: excludeSTIsPeople,
            excludeSmokers: excludeSmokers,
            excludeRecreationalDrugUsers: excludeRecreationalDrugUsers,
            maximumAcceptableAlcoholConsumptionFrequency: maximumAlcoholConsumption,
        }).then(() => {
            toast.success("Health and Habits filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Health and Habits filters: " + error.message);
        }).finally(() => {
            setIsSavingHealthHabits(false);
        });
    };

    const UpdateBackgroundCheckStatus = async (id) => {
        setExcludeBackgroundCheckStatus((prevState) =>
            prevState.map((status) =>
                status.id === id ? { ...status, excluded: !status.excluded } : status
            ))
    }

    const saveBackgroundCheckStatus = async () => {
        setIsSavingBackgroundCheckStatus(true);
        if (!api) return;
        const selectedBackgroundCheckStatus = excludeBackgroundCheckStatus.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/backgroundcheckstatus/choices',
            selectedBackgroundCheckStatus
        ).then(() => {
            toast.success("Background Check Status filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Background Check Status filters: " + error.message);
            console.error("🔴 Error saving  background check status", error);
        }).finally(() => {
            setIsSavingBackgroundCheckStatus(false);
        });
    };

    const UpdateEthnicities = async (id) => {
        setExcludeEthnicities((prevState) =>
            prevState.map((ethnicity) =>
                ethnicity.id === id ? { ...ethnicity, excluded: !ethnicity.excluded } : ethnicity
            ))
    }

    const saveEthnicities = async () => {
        setIsSavingEthnicities(true);
        if (!api) return;
        const selectedEthnicities = excludeEthnicities.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/ethnicity/choices',
            selectedEthnicities
        ).then(() => {
            toast.success("Ethnicities filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Ethnicities filters: " + error.message);
            console.log("🔴 Error saving  ethnicity", error);
        }).finally(() => {
            setIsSavingEthnicities(false);
        });
    };

    const UpdateReligion = async (id) => {
        setExcludeReligions((prevState) =>
            prevState.map((religion) =>
                religion.id === id ? { ...religion, excluded: !religion.excluded } : religion
            ))
    }

    const saveReligion = async () => {
        if (!api) return;
        setIsSavingReligions(true);
        const selectedReligions = excludeReligions.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/religion/choices',
            selectedReligions
        ).then(() => {
            toast.success("Religions filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Religions filters: " + error.message);
            console.log("🔴 Error saving  religion", error);
        }).finally(() => {
            setIsSavingReligions(false);
        });
    };

    const UpdateGender = async (id) => {
        setExcludeGenders((prevState) =>
            prevState.map((gender) =>
                gender.id === id ? { ...gender, excluded: !gender.excluded } : gender
            ))
    }

    const saveGender = async () => {
        if (!api) return;
        setIsSavingGenders(true);
        const selectedGenders = excludeGenders.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/gender/choices',
            selectedGenders
        ).then(() => {
            toast.success("Genders filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Genders filters: " + error.message);
            console.log("🔴 Error saving  gender", error);
        }).finally(() => {
            setIsSavingGenders(false);
        });
    };

    const UpdateOrientation = async (id) => {
        setExcludeSexualOrientations((prevState) =>
            prevState.map((orientation) =>
                orientation.id === id ? { ...orientation, excluded: !orientation.excluded } : orientation
            ))
    }

    const saveOrientation = async () => {
        if (!api) return;
        setIsSavingSexualOrientations(true);
        const selectedOrientations = excludeSexualOrientations.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/orientation/choices',
            selectedOrientations
        ).then(() => {
            toast.success("Orientation filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Orientation filters: " + error.message);
            console.error("🔴 Error saving  orientation", error);
        }).finally(() => {
            setIsSavingSexualOrientations(false);
        });
    };

    const UpdateRelationshipType = async (id) => {
        setExcludeRelationshipTypes((prevState) =>
            prevState.map((type) =>
                type.id === id ? { ...type, excluded: !type.excluded } : type
            ))
    }

    const saveRelationshipType = async () => {
        if (!api) return;
        setIsSavingRelationshipTypes(true);
        const selectedRelationshipTypes = excludeRelationshipTypes.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/relationshiptype/choices',
            selectedRelationshipTypes
        ).then(() => {
            toast.success("Relationship Types filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Relationship Types filters: " + error.message);
            console.error("🔴 Error saving  relationship type", error);
        }).finally(() => {
            setIsSavingRelationshipTypes(false);
        });
    };

    const UpdatePoliticalAffiliation = async (id) => {
        setExcludePoliticalAffiliations((prevState) =>
            prevState.map((affiliation) =>
                affiliation.id === id ? { ...affiliation, excluded: !affiliation.excluded } : affiliation
            ))
    }

    const savePoliticalAffiliation = async () => {
        if (!api) return;
        setIsSavingPoliticalAffiliations(true);
        const selectedPoliticalAffiliations = excludePoliticalAffiliations.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/politicalaffiliation/choices',
            selectedPoliticalAffiliations
        ).then(() => {
            toast.success("Political Affiliations filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Political Affiliations filters: " + error.message);
            console.log("🔴 Error saving  political affiliation", error);
        }).finally(() => {
            setIsSavingPoliticalAffiliations(false);
        });
    };

    const UpdatePhysicalActivityIndex = async (id) => {
        setExcludePhysicalActivityIndexes((prevState) =>
            prevState.map((index) =>
                index.id === id ? { ...index, excluded: !index.excluded } : index
            ))
    }

    const savePhysicalActivityIndex = async () => {
        if (!api) return;
        setIsSavingPhysicalActivityIndexes(true);
        const selectedPhysicalActivityIndexes = excludePhysicalActivityIndexes.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/physicalactivityindex/choices',
            selectedPhysicalActivityIndexes
        ).then(() => {
            toast.success("Physical Activity Index filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Physical Activity Index filters: " + error.message);
            console.log("🔴 Error saving  physical activity index", error);
        }).finally(() => {
            setIsSavingPhysicalActivityIndexes(false);
        });
    };

    const UpdateExcludedOccupation = async (id) => {
        setMergedExcludedOccupations((prevState) =>
            prevState.map((occupation) =>
                occupation.id === id ? { ...occupation, excluded: !occupation.excluded } : occupation
            ))
    }

    const saveExcludedOccupation = async () => {
        if (!api) return;
        setIsSavingExcludedOccupations(true);
        const selectedOccupations = mergedExcludedOccupations.filter(e => e.excluded).map(e => e.id);
        await api.post('/v1/filter/excludedoccupation/choices',
            selectedOccupations
        ).then(() => {
            toast.success("Occupation filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Occupation filters: " + error.message);
            console.log("🔴 Error saving  occupation", error);
        }).finally(() => {
            setIsSavingExcludedOccupations(false);
        });
    };

    const UpdateIncludedOccupation = async (id) => {
        setMergedIncludedOccupations((prevState) =>
            prevState.map((occupation) =>
                occupation.id === id ? { ...occupation, excluded: !occupation.excluded } : occupation
            ))
    }

    const saveIncludedOccupation = async () => {
        if (!api) return;
        setIsSavingIncludedOccupations(true);
        const selectedOccupations = mergedIncludedOccupations.filter(e => !e.excluded).map(e => e.id);
        await api.post('/v1/filter/includedoccupation/choices',
            selectedOccupations
        ).then(() => {
            toast.success("Occupation filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Occupation filters: " + error.message);
            console.log("🔴 Error saving  occupation", error);
        }).finally(() => {
            setIsSavingIncludedOccupations(false);
        });
    };




    const values = {
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
        excludeEthnicities, setExcludeEthnicities,
        excludeReligions, setExcludeReligions,
        excludeBackgroundCheckStatus, setExcludeBackgroundCheckStatus,
        excludeGenders, setExcludeGenders,
        excludeSexualOrientations, setExcludeSexualOrientations,
        excludeRelationshipTypes, setExcludeRelationshipTypes,
        excludePoliticalAffiliations, setExcludePoliticalAffiliations,
        excludePhysicalActivityIndexes, setExcludePhysicalActivityIndexes,
        includeOccupations, setIncludeOccupations,
        excludeOccupations, setExcludeOccupations,
        filtersLastUpdated, isRadiusInMiles, isWeightInPounds,
        saveLocation, saveStats, saveKidsPets, saveHealthHabits,
        UpdateEthnicities, saveEthnicities,
        UpdateReligion, saveReligion,
        UpdateGender, saveGender,
        UpdateOrientation, saveOrientation,
        UpdateRelationshipType, saveRelationshipType,
        UpdatePoliticalAffiliation, savePoliticalAffiliation,
        UpdatePhysicalActivityIndex, savePhysicalActivityIndex,
        UpdateIncludedOccupation, saveIncludedOccupation,
        UpdateExcludedOccupation, saveExcludedOccupation,
        UpdateBackgroundCheckStatus, saveBackgroundCheckStatus,
        isLoading, error,
        isSavingLocation, isSavingStats, isSavingKidsPets, isSavingHealthHabits,
        isSavingEthnicities, isSavingReligions, isSavingBackgroundCheckStatus,
        isSavingGenders, isSavingSexualOrientations, isSavingRelationshipTypes,
        isSavingPoliticalAffiliations, isSavingPhysicalActivityIndexes,
        isSavingIncludedOccupations, isSavingExcludedOccupations,
        mergedExcludedOccupations, mergedIncludedOccupations,
    };

    return (
        <FilterContext.Provider value={values}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;
