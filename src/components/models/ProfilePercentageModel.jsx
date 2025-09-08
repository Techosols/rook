


import { User, SlidersHorizontal, Info, Heart, Music, Dumbbell, Image } from "lucide-react";

function ProfilePercentageModel() {
  const sections = [
    { icon: User, label: "Your Info", percent: 83 },
    { icon: SlidersHorizontal, label: "Filters", percent: 87 },
    { icon: Info, label: "About You", percent: 100 },
    { icon: Heart, label: "Your Hobbies", percent: 0 },
    { icon: Music, label: "Music you like", percent: 0 },
    { icon: Dumbbell, label: "Phys Activity", percent: 0 },
    { icon: Image, label: "Your Pictures", percent: 75 },
  ];
  const total = 56;

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
        {sections.map(({ icon: Icon, label, percent }, idx) => (
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
