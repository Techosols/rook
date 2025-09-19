import { LucideBadgeInfo } from "lucide-react";
import { useState, useEffect } from "react";
import useOption from "../../hooks/useOption";
import useProfile from "../../hooks/useProfile";

import FormSection from "../ui/FormSection";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";

import useAuthenticatedApi from "../../hooks/useAuthenticatedAPi";
import userService from "../../services/user";

function YourHobbies() {
  const {
    miscHobbies,
    miscMusicalInstruments,
    miscMusicGenres,
    petTypes,
    sportsInterests,
  } = useOption();
  const { profile, isProfileLoading } = useProfile();

  const api = useAuthenticatedApi();

  const [hobbies, setHobbies] = useState([]);
  const [musicGener, setMusicGener] = useState([]);
  const [musicalInstrument, setMusicalInstrument] = useState([]);
  const [pets, setPets] = useState([]);
  const [sports, setSports] = useState([]);

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
    const selectedHobbies = hobbies
      .filter((hobby) => hobby.selected)
      .map((hobby) => hobby.id);

    console.log("Selected Hobbies:", selectedHobbies);
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

    console.log("Selected Music Gener:", selectedMusicGener);
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

    console.log("Selected Musical Instrument:", selectedMusicalInstrument);
    setSaveMusicalInstrumentLoading(true);
    userService.updateUserMiscData(api, "musicalinstruments", selectedMusicalInstrument)
      .finally(() => {
        setSaveMusicalInstrumentLoading(false);
      });
  }

  function savePets() {
    const selectedPets = pets
      .filter((pet) => pet.selected)
      .map((pet) => pet.id);
    console.log("Selected Pets:", selectedPets);

    setSavePetsLoading(true);
    userService.updateUserMiscData(api, "pettypes", selectedPets)
      .finally(() => {
        setSavePetsLoading(false);
      }
      );
  }

  function saveSports() {
    const selectedSports = sports
      .filter((sport) => sport.selected)
      .map((sport) => sport.id);
    console.log("Selected Sports:", selectedSports);
    setSaveSportsLoading(true);
    userService.updateUserMiscData(api, "sportsinterests", selectedSports)
      .finally(() => {
        setSaveSportsLoading(false);
      });
  }


  useEffect(() => {
    if (!isProfileLoading && profile) {
      setHobbies(miscHobbies || []);
      setMusicGener(miscMusicGenres || []);
      setMusicalInstrument(miscMusicalInstruments || []);
      setPets(petTypes || []);
      setSports(sportsInterests || []);
    }
  }, [profile]);

  const filteredHobbies = Object.values(hobbies).filter((hobby) =>
    hobby.name.toLowerCase().includes(searchHobby.toLowerCase())
  );
  const filteredMusicGener = Object.values(musicGener).filter((gener) =>
    gener.name.toLowerCase().includes(searchMusicGener.toLowerCase())
  );
  const filteredMusicalInstrument = Object.values(musicalInstrument).filter((instrument) =>
    instrument.name.toLowerCase().includes(searchMusicalInstrument.toLowerCase())
  );
  const filteredPets = Object.values(pets).filter((pet) =>
    pet.name.toLowerCase().includes(searchPets.toLowerCase())
  );
  const filteredSports = Object.values(sports).filter((sport) =>
    sport.name.toLowerCase().includes(searchSports.toLowerCase())
  );

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
          <Input
            type="text"
            placeholder={"e.g. Reading, Traveling, Cooking"}
            className="w-66"
            value={searchHobby}
            onChange={(e) => setSearchHobby(e.target.value)}
          />
          <div className="border border-gray-300 dark:bg-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {filteredHobbies.length === 0 && (
              <p className="text-gray-500">No hobbies found "{searchHobby}"</p>
            )}
            {filteredHobbies.map((hobby) => (
              <Checkbox
                key={hobby.id}
                label={hobby.name}
                checked={hobby.selected}
                onChange={() => {
                  setHobbies((prev) =>
                    prev.map((item) =>
                      item.id === hobby.id ? { ...item, selected: !item.selected } : item
                    )
                  );
                }}
              />
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title={"Music genres you like"} onSave={saveMusicGener} loading={saveMusicGenerLoading}>
        <div className="">
          <Input
            type="text"
            placeholder={"e.g. Pop, Rock, Jazz"}
            className="w-66"
            value={searchMusicGener}
            onChange={(e) => setSearchMusicGener(e.target.value)}
          />
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {filteredMusicGener.length === 0 && (
              <p className="text-gray-500">
                No music genres found "{searchMusicGener}"
              </p>
            )}
            {filteredMusicGener.map((gener) => (
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
          </div>
        </div>
      </FormSection>

      <FormSection title={"Musical instruments you play"} onSave={saveMusicalInstrument} loading={saveMusicalInstrumentLoading}>
        <div className="">
          <Input
            type="text"
            placeholder={"e.g. Guitar, Piano, Drums"}
            className="w-66"
            value={searchMusicalInstrument}
            onChange={(e) => setSearchMusicalInstrument(e.target.value)}
          />
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {filteredMusicalInstrument.length === 0 && (
              <p className="text-gray-500">
                No instruments found "{searchMusicalInstrument}"
              </p>
            )}
            {filteredMusicalInstrument.map((instrument) => (
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
          </div>
        </div>
      </FormSection>

      <FormSection title={"Pets you own"} onSave={savePets} loading={savePetsLoading}>
        <div className="">
          <Input
            type="text"
            placeholder={"e.g. Dogs, Cats, Fish"}
            className="w-66"
            value={searchPets}
            onChange={(e) => setSearchPets(e.target.value)}
          />
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {filteredPets.length === 0 && (
              <p className="text-gray-500">No pets found "{searchPets}"</p>
            )}
            {filteredPets.map((pet) => (
              <Checkbox
                key={pet.id}
                label={pet.name}
                checked={pet.selected}
                onChange={() => {
                  setPets((prev) =>
                    prev.map((item) =>
                      item.id === pet.id ? { ...item, selected: !item.selected } : item
                    )
                  );
                }}
              />
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection title={"Sports Interests"} onSave={saveSports} loading={saveSportsLoading}>
        <div className="">
          <Input
            type="text"
            placeholder={"e.g. Soccer, Basketball, Swimming"}
            className="w-66"
            value={searchSports}
            onChange={(e) => setSearchSports(e.target.value)}
          />
          <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
            {filteredSports.length === 0 && (
              <p className="text-gray-500">No sports found "{searchSports}"</p>
            )}
            {filteredSports.map((sport) => (
              <Checkbox
                key={sport.id}
                label={sport.name}
                checked={sport.selected}
                onChange={() => {
                  setSports((prev) =>
                    prev.map((item) =>
                      item.id === sport.id ? { ...item, selected: !item.selected } : item
                    )
                  );
                }}
              />
            ))}
          </div>
        </div>
      </FormSection>
    </div>
  );
}

export default YourHobbies;
