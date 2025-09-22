import OptionContext from "./OptionContext";
import { useState, useEffect } from "react";
import PrivateApi from "../../services/privateApi";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../hooks/useAuth";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";

const OptionProvider = ({ children }) => {

    const { isAuthenticated } = useAuth0();
    const { token } = useAuth();

    const api = useAuthenticatedApi();

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
        async function fetchOptions() {
            if (!token) return;

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
                    api.get(`${API_PREFIX}/alcoholconsumptionfrequencies`),
                    api.get(`${API_PREFIX}/complaintcategories`),
                    api.get(`${API_PREFIX}/complaintstatuses`),
                    api.get(`${API_PREFIX}/educationlevels`),
                    api.get(`${API_PREFIX}/ethnicities`),
                    api.get(`${API_PREFIX}/genders`),
                    api.get(`${API_PREFIX}/hobbies`),
                    api.get(`${API_PREFIX}/lovelanguages`),
                    api.get(`${API_PREFIX}/musicalinstruments`),
                    api.get(`${API_PREFIX}/musicgenres`),
                    api.get(`${API_PREFIX}/occupationprofiles`),
                    api.get(`${API_PREFIX}/orientations`),
                    api.get(`${API_PREFIX}/pets`),
                    api.get(`${API_PREFIX}/physicalactivitydurations`),
                    api.get(`${API_PREFIX}/physicalactivityfrequencies`),
                    api.get(`${API_PREFIX}/physicalactivityintensities`),
                    api.get(`${API_PREFIX}/physicalactivitytypes`),
                    api.get(`${API_PREFIX}/physicalactivitylengths`),
                    api.get(`${API_PREFIX}/politicalaffiliations`),
                    api.get(`${API_PREFIX}/relationshipstatuses`),
                    api.get(`${API_PREFIX}/relationshiptypes`),
                    api.get(`${API_PREFIX}/religions`),
                    api.get(`${API_PREFIX}/sports`),
                    api.get(`${API_PREFIX}/starsigns`),
                    api.get(`${API_PREFIX}/suggestioncategories`),
                    api.get(`${MISC_API_PREFIX}/convostarters`),
                    api.get(`${MISC_API_PREFIX}/hobbies`),
                    api.get(`${MISC_API_PREFIX}/musicalinstruments`),
                    api.get(`${MISC_API_PREFIX}/musicgenres`),
                    api.get(`${MISC_API_PREFIX}/pettypes`),
                    api.get(`${MISC_API_PREFIX}/physicalactivitytype`),
                    api.get(`${MISC_API_PREFIX}/relationshiptypes`),
                    api.get(`${MISC_API_PREFIX}/sportsinterests`)
                ]);

                setAlcoholConsumptionFrequencies(alcoholRes.data);
                setComplaintCategories(complaintCatRes.data);
                setComplaintStatuses(complaintStatusRes.data);
                setEducationLevels(educationLevelRes.data);
                setEthnicities(ethnicityRes.data);
                setGenders(genderRes.data);
                setHobbies(hobbyRes.data);
                setLoveLanguages(loveLanguageRes.data);
                setMusicalInstruments(musicalInstrumentRes.data);
                setMusicGenres(musicGenreRes.data);
                setOccupationProfiles(occupationProfileRes.data);
                setOrientations(orientationRes.data);
                setPets(petRes.data);
                setPhysicalActivityDurations(physicalActivityDurationRes.data);
                setPhysicalActivityFrequencies(physicalActivityFrequencyRes.data);
                setPhysicalActivityIntensities(physicalActivityIntensityRes.data);
                setPhysicalActivityTypes(physicalActivityTypeRes.data);
                setPoliticalAffiliations(politicalAffiliationRes.data);
                setRelationshipStatuses(relationshipStatusRes.data);
                setRelationshipTypes(relationshipTypeRes.data);
                setPhysicalActivityLengths(physicalActivityLengthRes.data);
                setReligions(religionRes.data);
                setSports(sportRes.data);
                setStarSigns(starSignRes.data);
                setSuggestionCategories(suggestionCategoryRes.data);
                setConvoStarters(convoStartersRes.data);
                setMiscHobbies(miscHobbiesRes.data);
                setMiscMusicalInstruments(miscMusicalInstrumentsRes.data);
                setMiscMusicGenres(miscMusicGenresRes.data);
                setPetTypes(petTypesRes.data);
                setMiscPhysicalActivityTypes(miscPhysicalActivityTypesRes.data);
                setMiscRelationshipTypes(miscRelationshipTypesRes.data);
                setSportsInterests(sportsInterestsRes.data);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        }
        
        if(isAuthenticated) {
            fetchOptions();
        }
    }, [isAuthenticated, token]);

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