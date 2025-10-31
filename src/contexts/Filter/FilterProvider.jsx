import FilterContext from "./FilterContext";
import { useEffect, useState } from "react";``

const FilterProvider = ({ children }) => {

    const [filters, setFilters] = useState({});

    // States and Setters
    const [zipCode, setZipCode] = useState("");
    const [distance, setDistance] = useState(50);
    const [ageFrom, setAgeFrom] = useState(18);
    const [ageTo, setAgeTo] = useState(99);
    const [heightFromFeet, setHeightFromFeet] = useState("");
    const [heightFromInches, setHeightFromInches] = useState("");
    const [heightToFeet, setHeightToFeet] = useState("");
    const [heightToInches, setHeightToInches] = useState("");
    const [weightFrom, setWeightFrom] = useState("");
    const [weightTo, setWeightTo] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [excludePeopleHaveKids, setExcludeKids] = useState(false);
    const [excludePeopleWantKids, setExcludeWantKids] = useState(false);
    const [excludePeopleHavePets, setExcludePeopleHavePets] = useState(false);
    const [excludePeopleWantPets, setExcludePeopleWantPets] = useState(false);
    const [excludeAsexualPeople, setExcludeAsexualPeople] = useState(false);
    const [excludeDisablingPeople, setExcludeDisablingPeople] = useState(false);
    const [excludeSTIsPeople, setExcludeSTIsPeople] = useState(false);
    const [excludeSmokers, setExcludeSmokers] = useState(false);
    const [excludeRecreationalDrugUsers, setExcludeRecreationalDrugUsers] = useState(false);
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

    useEffect(() => {
        // Update filters object whenever any filter state changes
    }, [filters]);


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
        excludePeopleHaveKids, setExcludeKids,
        excludePeopleWantKids, setExcludeWantKids,
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
    }

    return (
        <FilterContext.Provider value={values}>
            {children}
        </FilterContext.Provider>
    );
};
