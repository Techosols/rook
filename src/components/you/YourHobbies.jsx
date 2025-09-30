import { LucideBadgeInfo } from "lucide-react";
import { useState } from "react";
import useOption from "../../hooks/useOption";
import useProfile from "../../hooks/useProfile";

import FormSection from "../ui/FormSection";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";

import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import userService from "../../services/user";

function YourHobbies() {
  const {
    miscHobbies,
    miscMusicalInstruments,
    miscMusicGenres,
    petTypes,
    sportsInterests,
    // User selection states from OptionProvider
    musicGener, setMusicGener,
    musicalInstrument, setMusicalInstrument,
    userPets, setUserPets,
    userSports, setUserSports,
    userHobbies, setUserHobbies
  } = useOption();
  const { isProfileLoading } = useProfile();

  const api = useAuthenticatedApi();

  // Keep only search states local for immediate reset when switching tabs

  const [searchHobby, setSearchHobby] = useState("");
  const [searchMusicGener, setSearchMusicGener] = useState("");
  const [searchMusicalInstrument, setSearchMusicalInstrument] = useState("");
  const [searchPets, setSearchPets] = useState("");
  const [searchSports, setSearchSports] = useState("");

  // Loading state for saving data
  const [saveHobbyLoading, setSaveHobbyLoading] = useState(false);
  const [saveMusicGenerLoading, setSaveMusicGenerLoading] = useState(false);
  const [saveMusicalInstrumentLoading, setSaveMusicalInstrumentLoading] = useState(false);
  const [savePetsLoading, setSavePetsLoading] = useState(false);
  const [saveSportsLoading, setSaveSportsLoading] = useState(false);

  function saveHobbies() {
    const selectedHobbies = userHobbies
      .filter((hobby) => hobby.selected)
      .map((hobby) => hobby.id);

    setSaveHobbyLoading(true);
    userService.updateUserMiscData(api, "hobbies", selectedHobbies)
      .finally(() => {
        setSaveHobbyLoading(false);
      });
  }

  function saveMusicGener() {
    const selectedMusicGener = musicGener
      .filter((gener) => gener.selected)
      .map((gener) => gener.id);

    setSaveMusicGenerLoading(true);
    userService.updateUserMiscData(api, "musicgenres", selectedMusicGener)
      .finally(() => {
        setSaveMusicGenerLoading(false);
      });
  }

  function saveMusicalInstrument() {
    const selectedMusicalInstrument = musicalInstrument
      .filter((instrument) => instrument.selected)
      .map((instrument) => instrument.id);

    setSaveMusicalInstrumentLoading(true);
    userService.updateUserMiscData(api, "musicalinstruments", selectedMusicalInstrument)
      .finally(() => {
        setSaveMusicalInstrumentLoading(false);
      });
  }

  function savePets() {
    const selectedPets = userPets
      .filter((pet) => pet.selected)
      .map((pet) => pet.id);

    setSavePetsLoading(true);
    userService.updateUserMiscData(api, "pettypes", selectedPets)
      .finally(() => {
        setSavePetsLoading(false);
      }
      );
  }

  function saveSports() {
    const selectedSports = userSports
      .filter((sport) => sport.selected)
      .map((sport) => sport.id);
    setSaveSportsLoading(true);
    userService.updateUserMiscData(api, "sportsinterests", selectedSports)
      .finally(() => {
        setSaveSportsLoading(false);
      });
  }


  // Filter functions for search functionality with proper null checks
  const filteredHobbies = userHobbies && Array.isArray(userHobbies)
    ? userHobbies.filter((hobby) =>
        hobby && hobby.name && hobby.name.toLowerCase().includes(searchHobby.toLowerCase())
      )
    : [];  const filteredMusicGener = musicGener && Array.isArray(musicGener)
    ? musicGener.filter((gener) =>
        gener && gener.name && gener.name.toLowerCase().includes(searchMusicGener.toLowerCase())
      )
    : [];

  const filteredMusicalInstrument = musicalInstrument && Array.isArray(musicalInstrument)
    ? musicalInstrument.filter((instrument) =>
        instrument && instrument.name && instrument.name.toLowerCase().includes(searchMusicalInstrument.toLowerCase())
      )
    : [];

  const filteredPets = userPets && Array.isArray(userPets)
    ? userPets.filter((pet) =>
        pet && pet.name && pet.name.toLowerCase().includes(searchPets.toLowerCase())
      )
    : [];

  const filteredSports = userSports && Array.isArray(userSports)
    ? userSports.filter((sport) =>
        sport && sport.name && sport.name.toLowerCase().includes(searchSports.toLowerCase())
      )
    : [];

  return (
    <div className="p-1 flex flex-col gap-1 md:gap-4">
      <p className="text-sm text-gray-600">
        <span>
          <LucideBadgeInfo className="inline mb-1 mr-1" size={16} />
        </span>
        In this page, you provide info that is shown to other people in your
        profile. This info cannot be filtered on.
      </p>
      <FormSection title={"Your Hobbies"} onSave={saveHobbies} loading={saveHobbyLoading}>
        <div className="">
          {isProfileLoading || !userHobbies ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
          ) : (
            <Input
              type="text"
              placeholder={"e.g. Reading, Traveling, Cooking"}
              className="w-66"
              value={searchHobby}
              onChange={(e) => setSearchHobby(e.target.value)}
            />
          )}
          <div className="border border-gray-300 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {isProfileLoading || !userHobbies ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))
            ) : (
              <>
                {filteredHobbies && filteredHobbies.length === 0 && (
                  <p className="text-gray-500">No hobbies found "{searchHobby}"</p>
                )}
                {filteredHobbies && filteredHobbies.map((hobby) => (
                  <Checkbox
                    key={hobby.id}
                    label={hobby.name}
                    checked={hobby.selected}
                    onChange={() => {
                      setUserHobbies((prev) =>
                        prev.map((item) =>
                          item.id === hobby.id ? { ...item, selected: !item.selected } : item
                        )
                      );
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection title={"Music genres you like"} onSave={saveMusicGener} loading={saveMusicGenerLoading}>
        <div className="">
          {isProfileLoading || !miscMusicGenres ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
          ) : (
            <Input
              type="text"
              placeholder={"e.g. Pop, Rock, Jazz"}
              className="w-66"
              value={searchMusicGener}
              onChange={(e) => setSearchMusicGener(e.target.value)}
            />
          )}
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {isProfileLoading || !miscMusicGenres ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))
            ) : (
              <>
                {filteredMusicGener && filteredMusicGener.length === 0 && (
                  <p className="text-gray-500">
                    No music genres found "{searchMusicGener}"
                  </p>
                )}
                {filteredMusicGener && filteredMusicGener.map((gener) => (
                  <Checkbox
                    key={gener.id}
                    label={gener.name}
                    checked={gener.selected}
                    onChange={() => {
                      setMusicGener((prev) =>
                        prev.map((item) =>
                          item.id === gener.id ? { ...item, selected: !item.selected } : item
                        )
                      );
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection title={"Musical instruments you play"} onSave={saveMusicalInstrument} loading={saveMusicalInstrumentLoading}>
        <div className="">
          {isProfileLoading || !miscMusicalInstruments ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
          ) : (
            <Input
              type="text"
              placeholder={"e.g. Guitar, Piano, Drums"}
              className="w-66"
              value={searchMusicalInstrument}
              onChange={(e) => setSearchMusicalInstrument(e.target.value)}
            />
          )}
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {isProfileLoading || !miscMusicalInstruments ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))
            ) : (
              <>
                {filteredMusicalInstrument && filteredMusicalInstrument.length === 0 && (
                  <p className="text-gray-500">
                    No instruments found "{searchMusicalInstrument}"
                  </p>
                )}
                {filteredMusicalInstrument && filteredMusicalInstrument.map((instrument) => (
                  <Checkbox
                    key={instrument.id}
                    label={instrument.name}
                    checked={instrument.selected}
                    onChange={() => {
                      setMusicalInstrument((prev) =>
                        prev.map((item) =>
                          item.id === instrument.id ? { ...item, selected: !item.selected } : item
                        )
                      );
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection title={"Pets you own"} onSave={savePets} loading={savePetsLoading}>
        <div className="">
          {isProfileLoading || !petTypes ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
          ) : (
            <Input
              type="text"
              placeholder={"e.g. Dogs, Cats, Fish"}
              className="w-66"
              value={searchPets}
              onChange={(e) => setSearchPets(e.target.value)}
            />
          )}
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {isProfileLoading || !petTypes ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))
            ) : (
              <>
                {filteredPets && filteredPets.length === 0 && (
                  <p className="text-gray-500">No pets found "{searchPets}"</p>
                )}
                {filteredPets && filteredPets.map((pet) => (
                  <Checkbox
                    key={pet.id}
                    label={pet.name}
                    checked={pet.selected}
                    onChange={() => {
                      setUserPets((prev) =>
                        prev.map((item) =>
                          item.id === pet.id ? { ...item, selected: !item.selected } : item
                        )
                      );
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection title={"Sports Interests"} onSave={saveSports} loading={saveSportsLoading}>
        <div className="">
          {isProfileLoading || !sportsInterests ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
          ) : (
            <Input
              type="text"
              placeholder={"e.g. Soccer, Basketball, Swimming"}
              className="w-66"
              value={searchSports}
              onChange={(e) => setSearchSports(e.target.value)}
            />
          )}
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {isProfileLoading || !sportsInterests ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))
            ) : (
              <>
                {filteredSports && filteredSports.length === 0 && (
                  <p className="text-gray-500">No sports found "{searchSports}"</p>
                )}
                {filteredSports && filteredSports.map((sport) => (
                  <Checkbox
                    key={sport.id}
                    label={sport.name}
                    checked={sport.selected}
                    onChange={() => {
                      setUserSports((prev) =>
                        prev.map((item) =>
                          item.id === sport.id ? { ...item, selected: !item.selected } : item
                        )
                      );
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </FormSection>
    </div>
  );
}

export default YourHobbies;
