import OptionContext from "./OptionContext";
import { useState, useEffect } from "react";
import PrivateApi from "../../services/privateApi";
import { useAuth0 } from "@auth0/auth0-react";

const OptionProvider = ({ children }) => {

    const { isAuthenticated } = useAuth0();

    const API_PREFIX = "V1/options"
    const MISC_API_PREFIX = "V1/misc"

    const [alcoholConsumptionFrequencies, setAlcoholConsumptionFrequencies] = useState();
    const [complaintCategories, setComplaintCategories] = useState();
    const [complaintStatuses, setComplaintStatuses] = useState();
    const [educationLevels, setEducationLevels] = useState();
    const [ethnicities, setEthnicities] = useState();
    const [genders, setGenders] = useState();
    const [hobbies, setHobbies] = useState();
    const [loveLanguages, setLoveLanguages] = useState();
    const [musicalInstruments, setMusicalInstruments] = useState();
    const [musicGenres, setMusicGenres] = useState();
    const [occupationProfiles, setOccupationProfiles] = useState();
    const [orientations, setOrientations] = useState();
    const [pets, setPets] = useState();
    const [physicalActivityDurations, setPhysicalActivityDurations] = useState();
    const [physicalActivityFrequencies, setPhysicalActivityFrequencies] = useState();
    const [physicalActivityIntensities, setPhysicalActivityIntensities] = useState();
    const [physicalActivityTypes, setPhysicalActivityTypes] = useState();
    const [physicalActivityLengths, setPhysicalActivityLengths] = useState();
    const [politicalAffiliations, setPoliticalAffiliations] = useState();
    const [relationshipStatuses, setRelationshipStatuses] = useState();
    const [relationshipTypes, setRelationshipTypes] = useState();
    const [religions, setReligions] = useState();
    const [sports, setSports] = useState();
    const [starSigns, setStarSigns] = useState();
    const [suggestionCategories, setSuggestionCategories] = useState();
    const [convoStarters, setConvoStarters] = useState();
    const [miscHobbies, setMiscHobbies] = useState();
    const [miscMusicalInstruments, setMiscMusicalInstruments] = useState();
    const [miscMusicGenres, setMiscMusicGenres] = useState();
    const [petTypes, setPetTypes] = useState();
    const [miscPhysicalActivityTypes, setMiscPhysicalActivityTypes] = useState();
    const [miscRelationshipTypes, setMiscRelationshipTypes] = useState();
    const [sportsInterests, setSportsInterests] = useState();

    /*
    console.log('Fetched Options: ', {
        alcoholConsumptionFrequencies,
        complaintCategories,
        complaintStatuses,
        educationLevels,
        ethnicities,
        genders,
        hobbies,
        loveLanguages,
        musicalInstruments,
        musicGenres,
        occupationProfiles,
        orientations,
        pets,
        physicalActivityDurations,
        physicalActivityFrequencies,
        physicalActivityIntensities,
        physicalActivityTypes,
        politicalAffiliations,
        relationshipStatuses,
        relationshipTypes,
        religions,
        sports,
        starSigns,
        suggestionCategories
    })

    */


    useEffect(() => {
        // Helper to load from localStorage
        function loadFromStorage(key, setter) {
            const saved = localStorage.getItem(key);
            if (saved) setter(JSON.parse(saved));
        }


        // Load all from localStorage first for fast UI
        loadFromStorage('alcoholConsumptionFrequencies', setAlcoholConsumptionFrequencies);
        loadFromStorage('complaintCategories', setComplaintCategories);
        loadFromStorage('complaintStatuses', setComplaintStatuses);
        loadFromStorage('educationLevels', setEducationLevels);
        loadFromStorage('ethnicities', setEthnicities);
        loadFromStorage('genders', setGenders);
        loadFromStorage('hobbies', setHobbies);
        loadFromStorage('loveLanguages', setLoveLanguages);
        loadFromStorage('musicalInstruments', setMusicalInstruments);
        loadFromStorage('musicGenres', setMusicGenres);
        loadFromStorage('occupationProfiles', setOccupationProfiles);
        loadFromStorage('orientations', setOrientations);
        loadFromStorage('pets', setPets);
        loadFromStorage('physicalActivityDurations', setPhysicalActivityDurations);
        loadFromStorage('physicalActivityFrequencies', setPhysicalActivityFrequencies);
        loadFromStorage('physicalActivityIntensities', setPhysicalActivityIntensities);
        loadFromStorage('physicalActivityTypes', setPhysicalActivityTypes);
        loadFromStorage('physicalActivityLengths', setPhysicalActivityLengths);
        loadFromStorage('politicalAffiliations', setPoliticalAffiliations);
        loadFromStorage('relationshipStatuses', setRelationshipStatuses);
        loadFromStorage('relationshipTypes', setRelationshipTypes);
        loadFromStorage('religions', setReligions);
        loadFromStorage('sports', setSports);
        loadFromStorage('starSigns', setStarSigns);
        loadFromStorage('suggestionCategories', setSuggestionCategories);
        loadFromStorage('convoStarters', setConvoStarters);
        loadFromStorage('miscHobbies', setMiscHobbies);
        loadFromStorage('miscMusicalInstruments', setMiscMusicalInstruments);
        loadFromStorage('miscMusicGenres', setMiscMusicGenres);
        loadFromStorage('petTypes', setPetTypes);
        loadFromStorage('miscPhysicalActivityTypes', setMiscPhysicalActivityTypes);
        loadFromStorage('miscRelationshipTypes', setMiscRelationshipTypes);
        loadFromStorage('sportsInterests', setSportsInterests);

        async function fetchOptions() {
            if (!isAuthenticated) return;

            try {
                const [
                    alcoholRes,
                    complaintCatRes,
                    complaintStatusRes,
                    educationLevelRes,
                    ethnicityRes,
                    genderRes,
                    hobbyRes,
                    loveLanguageRes,
                    musicalInstrumentRes,
                    musicGenreRes,
                    occupationProfileRes,
                    orientationRes,
                    petRes,
                    physicalActivityDurationRes,
                    physicalActivityFrequencyRes,
                    physicalActivityIntensityRes,
                    physicalActivityTypeRes,
                    physicalActivityLengthRes,
                    politicalAffiliationRes,
                    relationshipStatusRes,
                    relationshipTypeRes,
                    religionRes,
                    sportRes,
                    starSignRes,
                    suggestionCategoryRes,
                    convoStartersRes,
                    miscHobbiesRes,
                    miscMusicalInstrumentsRes,
                    miscMusicGenresRes,
                    petTypesRes,
                    miscPhysicalActivityTypesRes,
                    miscRelationshipTypesRes,
                    sportsInterestsRes
                ] = await Promise.all([
                    PrivateApi.get(`${API_PREFIX}/alcoholconsumptionfrequencies`),
                    PrivateApi.get(`${API_PREFIX}/complaintcategories`),
                    PrivateApi.get(`${API_PREFIX}/complaintstatuses`),
                    PrivateApi.get(`${API_PREFIX}/educationlevels`),
                    PrivateApi.get(`${API_PREFIX}/ethnicities`),
                    PrivateApi.get(`${API_PREFIX}/genders`),
                    PrivateApi.get(`${API_PREFIX}/hobbies`),
                    PrivateApi.get(`${API_PREFIX}/lovelanguages`),
                    PrivateApi.get(`${API_PREFIX}/musicalinstruments`),
                    PrivateApi.get(`${API_PREFIX}/musicgenres`),
                    PrivateApi.get(`${API_PREFIX}/occupationprofiles`),
                    PrivateApi.get(`${API_PREFIX}/orientations`),
                    PrivateApi.get(`${API_PREFIX}/pets`),
                    PrivateApi.get(`${API_PREFIX}/physicalactivitydurations`),
                    PrivateApi.get(`${API_PREFIX}/physicalactivityfrequencies`),
                    PrivateApi.get(`${API_PREFIX}/physicalactivityintensities`),
                    PrivateApi.get(`${API_PREFIX}/physicalactivitytypes`),
                    PrivateApi.get(`${API_PREFIX}/physicalactivitylengths`),
                    PrivateApi.get(`${API_PREFIX}/politicalaffiliations`),
                    PrivateApi.get(`${API_PREFIX}/relationshipstatuses`),
                    PrivateApi.get(`${API_PREFIX}/relationshiptypes`),
                    PrivateApi.get(`${API_PREFIX}/religions`),
                    PrivateApi.get(`${API_PREFIX}/sports`),
                    PrivateApi.get(`${API_PREFIX}/starsigns`),
                    PrivateApi.get(`${API_PREFIX}/suggestioncategories`),
                    PrivateApi.get(`${MISC_API_PREFIX}/convostarters`),
                    PrivateApi.get(`${MISC_API_PREFIX}/hobbies`),
                    PrivateApi.get(`${MISC_API_PREFIX}/musicalinstruments`),
                    PrivateApi.get(`${MISC_API_PREFIX}/musicgenres`),
                    PrivateApi.get(`${MISC_API_PREFIX}/pettypes`),
                    PrivateApi.get(`${MISC_API_PREFIX}/physicalactivitytype`),
                    PrivateApi.get(`${MISC_API_PREFIX}/relationshiptypes`),
                    PrivateApi.get(`${MISC_API_PREFIX}/sportsinterests`)
                ]);

                // Helper to update state and localStorage if changed
                function updateIfChanged(key, data, setter) {
                    const saved = localStorage.getItem(key);
                    if (!saved || JSON.stringify(data) !== saved) {
                        setter(data);
                        localStorage.setItem(key, JSON.stringify(data));
                    }
                }

                updateIfChanged('alcoholConsumptionFrequencies', alcoholRes.data, setAlcoholConsumptionFrequencies);
                updateIfChanged('complaintCategories', complaintCatRes.data, setComplaintCategories);
                updateIfChanged('complaintStatuses', complaintStatusRes.data, setComplaintStatuses);
                updateIfChanged('educationLevels', educationLevelRes.data, setEducationLevels);
                updateIfChanged('ethnicities', ethnicityRes.data, setEthnicities);
                updateIfChanged('genders', genderRes.data, setGenders);
                updateIfChanged('hobbies', hobbyRes.data, setHobbies);
                updateIfChanged('loveLanguages', loveLanguageRes.data, setLoveLanguages);
                updateIfChanged('musicalInstruments', musicalInstrumentRes.data, setMusicalInstruments);
                updateIfChanged('musicGenres', musicGenreRes.data, setMusicGenres);
                updateIfChanged('occupationProfiles', occupationProfileRes.data, setOccupationProfiles);
                updateIfChanged('orientations', orientationRes.data, setOrientations);
                updateIfChanged('pets', petRes.data, setPets);
                updateIfChanged('physicalActivityDurations', physicalActivityDurationRes.data, setPhysicalActivityDurations);
                updateIfChanged('physicalActivityFrequencies', physicalActivityFrequencyRes.data, setPhysicalActivityFrequencies);
                updateIfChanged('physicalActivityIntensities', physicalActivityIntensityRes.data, setPhysicalActivityIntensities);
                updateIfChanged('physicalActivityTypes', physicalActivityTypeRes.data, setPhysicalActivityTypes);
                updateIfChanged('politicalAffiliations', politicalAffiliationRes.data, setPoliticalAffiliations);
                updateIfChanged('relationshipStatuses', relationshipStatusRes.data, setRelationshipStatuses);
                updateIfChanged('relationshipTypes', relationshipTypeRes.data, setRelationshipTypes);
                updateIfChanged('physicalActivityLengths', physicalActivityLengthRes.data, setPhysicalActivityLengths);
                updateIfChanged('religions', religionRes.data, setReligions);
                updateIfChanged('sports', sportRes.data, setSports);
                updateIfChanged('starSigns', starSignRes.data, setStarSigns);
                updateIfChanged('suggestionCategories', suggestionCategoryRes.data, setSuggestionCategories);
                updateIfChanged('convoStarters', convoStartersRes.data, setConvoStarters);
                updateIfChanged('miscHobbies', miscHobbiesRes.data, setMiscHobbies);
                updateIfChanged('miscMusicalInstruments', miscMusicalInstrumentsRes.data, setMiscMusicalInstruments);
                updateIfChanged('miscMusicGenres', miscMusicGenresRes.data, setMiscMusicGenres);
                updateIfChanged('petTypes', petTypesRes.data, setPetTypes);
                updateIfChanged('miscPhysicalActivityTypes', miscPhysicalActivityTypesRes.data, setMiscPhysicalActivityTypes);
                updateIfChanged('miscRelationshipTypes', miscRelationshipTypesRes.data, setMiscRelationshipTypes);
                updateIfChanged('sportsInterests', sportsInterestsRes.data, setSportsInterests);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        }
        fetchOptions();
    }, [isAuthenticated]);

    const values = {
        alcoholConsumptionFrequencies,
        complaintCategories,
        complaintStatuses,
        educationLevels,
        ethnicities,
        genders,
        hobbies,
        loveLanguages,
        musicalInstruments,
        musicGenres,
        occupationProfiles,
        orientations,
        pets,
        physicalActivityDurations,
        physicalActivityFrequencies,
        physicalActivityIntensities,
        physicalActivityTypes,
        physicalActivityLengths,
        politicalAffiliations,
        relationshipStatuses,
        relationshipTypes,
        religions,
        sports,
        starSigns,
        suggestionCategories,
        convoStarters,
        miscHobbies,
        miscMusicalInstruments,
        miscMusicGenres,
        petTypes,
        miscPhysicalActivityTypes,
        miscRelationshipTypes,
        sportsInterests
    }

    return (
        <OptionContext.Provider value={values}>
            {children}
        </OptionContext.Provider>
    )
}

export default OptionProvider;