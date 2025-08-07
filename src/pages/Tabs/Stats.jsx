import React from "react";
import { MapPin } from "lucide-react";

function Stats() {
  return (
   <section className=" bg-background dark:bg-background-dark text-text dark:text-text-dark">
     <div>
      <div className="flex items-center justify-center gap-2 p-4 border-b">
        <div className="flex">
          <MapPin className="text-black text-xl dark:text-white" />
        </div>
        <input
          type="text"
          placeholder="Enter your US ZIP code"
          className="border border-gray-400 rounded px-3 py-1 focus:outline-none"
        />
        <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-200">
          Go
        </button>
      </div>
    </div>
   </section>
  );
}

export default Stats;
