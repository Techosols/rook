import FilterContext from "./FilterContext";
import { useEffect, useState } from "react";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { toast } from "react-toastify";
import useProfile from "../../hooks/useProfile";

const FilterProvider = ({ children }) => {

    const [singleChoiceFilters, setSingleChoiceFilters] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { zipCode, setZipCode} = useProfile();
    const api = useAuthenticatedApi();

    // console.log("Single Choice Filters:", singleChoiceFilters);

    // Validation States
    const [filtersLastUpdated, setFiltersLastUpdated] = useState(null);
    const [isWeightInPounds, setIsWeightInPounds] = useState(null);
    const [isRadiusInMiles, setIsRadiusInMiles] = useState(null);

    // States and Setters
    // const [zipCode, setZipCode] = useState(PostalCode || "");
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


    // console.log("FilterProvider Rendered - singleChoiceFilters:", singleChoiceFilters);
    // console.log('Multi-Choice Filters: ', {
    //     excludeEthnicities,
    //     excludeReligions,
    //     excludeBackgroundCheckStatus,
    //     excludeOccupations,
    //     excludeGenders,
    //     excludeSexualOrientations,
    //     excludeRelationshipTypes,
    //     excludePoliticalAffiliations,
    //     excludePhysicalActivityIndexes,
    //     includeOccupations,
    // })

    // Fetch initial filters when API becomes available
    useEffect(() => {
        if (!api) {
            setIsLoading(true);
            // console.log("API not available yet, waiting...");
            return; // Wait for API to be available
        }

        const fetchInitialFilters = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const [
                    singleChoiceFilterRes,
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
        setExcludePeopleWantKids(singleChoiceFilters.excludePersonsWhoWantOwnKids );
        setExcludePeopleHavePets(singleChoiceFilters.excludePersonsWithPetsNow );
        setExcludePeopleWantPets(singleChoiceFilters.excludePersonsWhoWantOwnPets);
        setExcludeAsexualPeople(singleChoiceFilters.excludeAsexualPersons );
        setExcludeDisablingPeople(singleChoiceFilters.excludeDisabledPersons);
        setExcludeSTIsPeople(singleChoiceFilters.excludeSTIPersons );
        setExcludeSmokers(singleChoiceFilters.excludeSmokers );
        setExcludeRecreationalDrugUsers(singleChoiceFilters.excludeRecreationalDrugUsers);
        setMaximumAlcoholConsumption(singleChoiceFilters.maximumAcceptableAlcoholConsumptionFrequency || "");
        setFiltersLastUpdated(singleChoiceFilters.lastUpdated);
        setIsRadiusInMiles(singleChoiceFilters.isRadiusInMiles);
        setIsWeightInPounds(singleChoiceFilters.isWeightInPounds);
    }, [singleChoiceFilters]);

    const saveLocation = async () => {
        if (!api) return;
        await api.patch('/v1/filter/other', {
            postalCode: zipCode,
            postalCodeWithinRadius: distance,
        }).then(() => {
            toast.success("Location filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving location filters: " + error.message);
        });
    };

    const saveStats = async () => {
        if (!api) return;
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
        });
    };

    const saveKidsPets = async () => {
        if (!api) return;
        await api.patch('/v1/filter/other', {
            excludePersonsWithKidsNow: excludePeopleHaveKids,
            excludePersonsWhoWantOwnKids: excludePeopleWantKids,
            excludePersonsWithPetsNow: excludePeopleHavePets,
            excludePersonsWhoWantOwnPets: excludePeopleWantPets,
        }).then(() => {
            toast.success("Kids and Pets filters saved successfully.");
        }).catch((error) => {
            toast.error("Error saving Kids and Pets filters: " + error.message);
        });
    };

    const saveHealthHabits = async () => {
        if (!api) return;
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
        isLoading, error,
    };

    return (
        <FilterContext.Provider value={values}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;
