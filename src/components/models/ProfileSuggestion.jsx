import React, { useState } from "react";
import useOption from "../../hooks/useOption";
import Select from "../ui/Select";

function ProfileSuggestion() {
  const { suggestionCategories } = useOption();
  const [suggestionCategory, setSuggestionCategory] = useState("");
  const [suggestionText, setSuggestionText] = useState("");

  function handleTextChange(e) {
    const text = e.target.value;
    if (text.length > 500) return;
    setSuggestionText(text);
  }
  return (
    <div>
      <h3 className="text-lg font-semibold dark:text-white mb-4">
        Suggestion Category
      </h3>
      <div>
        <Select
          options={
            suggestionCategories ? Object.values(suggestionCategories) : []
          }
          placeholder="Select a category"
          value={suggestionCategory}
          onChange={(e) => setSuggestionCategory(e.target.value)}
          className="!w-full"
        />
        <div className="mt-5 mb-3">
          <textarea
            placeholder="Type your suggestions here.."
            className="border border-gray-300 dark:border-gray-500 p-2 w-full rounded-lg focus:outline-primary placeholder:text-gray-400 dark:text-white dark:bg-gray-800 resize-none"
            value={suggestionText}
            rows={5}
            onChange={(e) => handleTextChange(e)}
          ></textarea>
        </div>
        <div className="flex justify-between">
          <p className="text-primary text-sm">{suggestionText.length}/500</p>
          <button className="px-7 py-2 rounded-md bg-primary text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSuggestion;
