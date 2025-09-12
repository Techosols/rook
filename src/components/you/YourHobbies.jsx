import { LucideBadgeInfo } from "lucide-react"
import { useState } from "react"
import useOption from "../../hooks/useOption"

import FormSection from "../ui/FormSection"
import Input from "../ui/Input"
import Checkbox from "../ui/Checkbox"

function YourHobbies() {

  const { miscHobbies, miscMusicalInstruments, miscMusicGenres, petTypes, sportsInterests } = useOption();


    const hobbiesData = [
      {
        id: 1,
        name: 'Acting and Theater',
        selected: false
      },
      {
        id: 2,
        name: 'Arts and Crafts',
        selected: false
      },
      { 
        id: 3,
        name: 'Board Games',
        selected: false
      },
      { 
        id: 4,
        name: 'Collecting',
        selected: false
      },
      { 
        id: 5,
        name: 'Cooking and Baking',
        selected: false
      },
      { 
        id: 6,
        name: 'Dancing',
        selected: true,
      },
      { 
        id: 7,
        name: 'Drawing and Painting',
        selected: false
      },
      { 
        id: 8,
        name: 'Gardening',
        selected: false
      }
    ]

    const musicGenereData = [
      {
        id: 1,
        name: 'Pop',
        selected: false
      },
      {
        id: 2,
        name: 'Rock',
        selected: false
      },
      {
        id: 3,
        name: 'Hip Hop',
        selected: false
      },
      {
        id: 4,
        name: 'Jazz',
        selected: false
      },
      {
        id: 5,
        name: 'Classical',
        selected: false
      },
      {
        id: 6,
        name: 'Electronic',
        selected: false
      },
      {
        id: 7,
        name: 'Reggae',
        selected: false
      },
      {
        id: 8,
        name: 'Country',
        selected: false
      }
    ]

    const musicalInstrumentData = [
      {
        id: 1,
        name: 'Guitar',
        selected: false
      },
      { id: 2,
        name: 'Piano',
        selected: false
      },
      {
        id: 3,
        name: 'Violin',
        selected: false
      },
      { 
        id: 4,
        name: 'Drums',
        selected: false
      },
      { 
        id: 5,
        name: 'Flute',
        selected: false
      },
      { 
        id: 6,
        name: 'Saxophone',
        selected: false
      },
      { 
        id: 7,
        name: 'Trumpet',
        selected: false
      },
      { 
        id: 8,
        name: 'Cello',
        selected: false
      }
    ]

    const petsData = [
      {
        id: 1,
        name: 'Dog',
        selected: false
      },
      {
        id: 2,
        name: 'Cat',
        selected: false
      },
      { id: 3,
        name: 'Bird',
        selected: false
      },
      { id: 4,
        name: 'Fish',
        selected: false
      },
      { id: 5,  
        name: 'Hamster',
        selected: false
      },
      { id: 6,
        name: 'Rabbit',
        selected: false
      }
    ]

    const sportsData = [
      {
        id: 1,
        name: 'Soccer',
        selected: false
      },
      {
        id: 2,
        name: 'Basketball',
        selected: false
      },
      { id: 3,
        name: 'Tennis',
        selected: false
      },
      { id: 4,
        name: 'Swimming',

        selected: false
      },
      { id: 5,
        name: 'Cycling',
        selected: false
      },
      { id: 6,
        name: 'Running',
        selected: false
      }
    ]


    const [hobbies, setHobbies] = useState(hobbiesData);
    const [musicGener, setMusicGener] = useState(musicGenereData);
    const [musicalInstrument, setMusicalInstrument] = useState(musicalInstrumentData);
    const [pets, setPets] = useState(petsData);
    const [sports, setSports] = useState(sportsData);

    const [serachHobby, setSearchHobby] = useState("")
    const [searchMusicGener, setSearchMusicGener] = useState("")
    const [searchMusicalInstrument, setSearchMusicalInstrument] = useState("")
    const [searchPets, setSearchPets] = useState("")
    const [searchSports, setSearchSports] = useState("")

    function handleHobbyChange(id) {
      const updatedHobbies = hobbies.map((hobby) => {
        if (hobby.id === id) {
          return { ...hobby, selected: !hobby.selected };
        }
        return hobby;
      });
      setHobbies(updatedHobbies);
    }

    function handleMusicGenerChange(id) {
      const updatedMusicGener = musicGener.map((gener) => {
        if (gener.id === id) {
          return { ...gener, selected: !gener.selected };
        }
        return gener;
      });
      setMusicGener(updatedMusicGener);
    }

    function handleMusicalInstrumentChange(id) {
      const updatedMusicalInstrument = musicalInstrument.map((instrument) => {
        if (instrument.id === id) {
          return { ...instrument, selected: !instrument.selected };
        }
        return instrument;
      });
      setMusicalInstrument(updatedMusicalInstrument);
    }

    function handlePetsChange(id) {
      const updatedPets = pets.map((pet) => {
        if (pet.id === id) {
          return { ...pet, selected: !pet.selected };
        }
        return pet;
      });
      setPets(updatedPets);
    }

    function handleSportsChange(id) {
      const updatedSports = sports.map((sport) => {
        if (sport.id === id) {
          return { ...sport, selected: !sport.selected };
        }
        return sport;
      });
      setSports(updatedSports);
    }

    const filteredHobbies = hobbies.filter(hobby => hobby.name.toLowerCase().includes(serachHobby.toLowerCase()));
    const filteredMusicGener = musicGener.filter(gener => gener.name.toLowerCase().includes(searchMusicGener.toLowerCase()));
    const filteredMusicalInstrument = musicalInstrument.filter(instrument => instrument.name.toLowerCase().includes(searchMusicalInstrument.toLowerCase()));
    const filteredPets = pets.filter(pet => pet.name.toLowerCase().includes(searchPets.toLowerCase()));
    const filteredSports = sports.filter(sport => sport.name.toLowerCase().includes(searchSports.toLowerCase()));

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <p className="text-sm text-gray-600">
        <span>
            <LucideBadgeInfo className="inline mb-1 mr-1" size={16} />
        </span>
        In this page, you provide info that is shown to other people in your profile. This info cannot be filtered on.
      </p>
      <FormSection title={"Your Hobbies"}>
          <div className="">
            <Input type="text" placeholder={"e.g. Reading, Traveling, Cooking"} className="w-66" onChange={(e) => setSearchHobby(e.target.value)} />
            <div className="border border-gray-300 dark:bg-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
              {filteredHobbies.length === 0 && (<p className="text-gray-500">No hobbies found "{serachHobby}"</p>)}
              {filteredHobbies.map((hobby) => (
                <Checkbox
                  key={hobby.id}
                  label={hobby.name}
                  checked={hobby.selected}
                  onChange={() => handleHobbyChange(hobby.id)}
                />
              ))}
            </div>
          </div>
      </FormSection>

      <FormSection title={"Music genres you like"}>
          <div className="">
            <Input type="text" placeholder={"e.g. Pop, Rock, Jazz"} className="w-66" onChange={(e) => setSearchMusicGener(e.target.value)} />
            <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
              {filteredMusicGener.length === 0 && (<p className="text-gray-500">No music genres found "{searchMusicGener}"</p>)}
              {filteredMusicGener.map((gener) => (
                <Checkbox
                  key={gener.id}
                  label={gener.name}
                  checked={gener.selected}
                  onChange={() => handleMusicGenerChange(gener.id)}
                />
              ))}
            </div>
          </div>
      </FormSection>

      <FormSection title={"Musical instruments you play"}>
          <div className="">
            <Input type="text" placeholder={"e.g. Guitar, Piano, Drums"} className="w-66" onChange={(e) => setSearchMusicalInstrument(e.target.value)} />
            <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
              {filteredMusicalInstrument.length === 0 && (<p className="text-gray-500">No instruments found "{searchMusicalInstrument}"</p>)}
              {filteredMusicalInstrument.map((instrument) => (
                <Checkbox
                  key={instrument.id}
                  label={instrument.name}
                  checked={instrument.selected}
                  onChange={() => handleMusicalInstrumentChange(instrument.id)}
                />
              ))}
            </div>
          </div>
      </FormSection>

      <FormSection title={"Pets you own"}>
          <div className="">
            <Input type="text" placeholder={"e.g. Dog, Cat, Fish"} className="w-66" onChange={(e) => setSearchPets(e.target.value)} />
            <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
              {filteredPets.length === 0 && (<p className="text-gray-500">No pets found "{searchPets}"</p>)}
              {filteredPets.map((pet) => (
                <Checkbox
                  key={pet.id}
                  label={pet.name}
                  checked={pet.selected}
                  onChange={() => handlePetsChange(pet.id)}
                />
              ))}
            </div>
          </div>
      </FormSection>

      <FormSection title={"Sports Interests"}>
          <div className="">
            <Input type="text" placeholder={"e.g. Soccer, Basketball, Swimming"} className="w-66" onChange={(e) => setSearchSports(e.target.value)} />
            <div className="border border-gray-300 dark:border-gray-500 p-3 rounded-lg mt-3 flex flex-col gap-3 max-h-96 overflow-y-auto">
              {filteredSports.length === 0 && (<p className="text-gray-500">No sports found "{searchSports}"</p>)}
              {filteredSports.map((sport) => (
                <Checkbox
                  key={sport.id}
                  label={sport.name}
                  checked={sport.selected}
                  onChange={() => handleSportsChange(sport.id)}
                />
              ))}
            </div>
          </div>
      </FormSection>
    </div>)
}

export default YourHobbies
