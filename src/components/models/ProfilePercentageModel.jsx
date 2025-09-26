


import { User, SlidersHorizontal, Info, Heart, Music, Dumbbell, Image } from "lucide-react";

function ProfilePercentageModel({ data }) {
  const statData = data?.statData;
  
  // Define section mappings with their corresponding icons and API keys
  const sectionMappings = [
    { 
      icon: User, 
      label: "Your Info", 
      key: "Your Info"
    },
    { 
      icon: SlidersHorizontal, 
      label: "Filters", 
      key: "Filters"
    },
    { 
      icon: Info, 
      label: "About You", 
      key: "About You"
    },
    { 
      icon: Heart, 
      label: "Your Hobbies", 
      key: "Your Hobbies"
    },
    { 
      icon: Music, 
      label: "Music you like", 
      key: "Music you like"
    },
    { 
      icon: Dumbbell, 
      label: "Physical Activity", 
      key: "Your Physical Activity"
    },
    { 
      icon: Image, 
      label: "Your Pictures", 
      key: "Your Pictures"
    },
  ];

  // Get sections with actual data or fallback to 0
  const sections = sectionMappings.map(section => ({
    ...section,
    percent: statData ? Math.floor(statData[section.key] || 0) : 0
  }));

  // Get total percentage
  const total = statData ? Math.floor(statData["Total % Completed"] || 0) : 0;

  

  return (
    <div className="bg-white dark:bg-background-dark rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-center mb-6 text-primary">Profile Completion</h3>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-700 dark:text-gray-200 font-semibold">Total Completed</span>
          <span className="font-bold text-primary">{total}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${total}%` }}
          ></div>
        </div>
      </div>
      <ul className="divide-y divide-gray-100 dark:divide-gray-700">
        {sections.map(({ icon: Icon, label, percent }) => (
          <li key={label} className="flex items-center gap-3 py-3">
            <span className="flex items-center justify-center bg-primary/10 text-primary rounded-full p-2">
              <Icon className="w-5 h-5" />
            </span>
            <span className="flex-1 text-gray-700 dark:text-gray-200 font-medium">{label}</span>
            <span className="font-bold text-primary text-base">{percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfilePercentageModel
