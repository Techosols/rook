import React, { useState } from "react";
import useOption from "../../hooks/useOption";
import useModel from "../../hooks/useModel";
import Select from "../ui/Select";
import Button from '../ui/Button';
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { toast } from "react-toastify";

function ProfileSuggestion() {
  const { suggestionCategories } = useOption();
  const { model, closeModel } = useModel();
  const [suggestionCategory, setSuggestionCategory] = useState("");
  const [suggestionText, setSuggestionText] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const api = useAuthenticatedApi();

  function handleTextChange(e) {
    const text = e.target.value;
    if (text.length > 500) return;
    setSuggestionText(text);
  }

  function handleSubmitSuggestion() {
    if (!api) {
      toast.error("Unable to submit suggestion. Please try again later.");
      return;
    }
    if (!suggestionCategory) {
      toast.error("Please select a suggestion category.");
      return;
    }
    if (!suggestionText) {
      toast.error("Please enter your suggestion.");
      return;
    }
    try {
      setSubmitting(true);
      let formmattedObject = {
        "object": "event",
        "type": "user.suggest",
        "data": {
          "occurredAt": new Date().toISOString(),
          "profileId": model?.profileId,
          "notes": suggestionText,
          "suggestionCategoryName": suggestionCategory
        }
      };
      api.post('v1/actions/record',
        formmattedObject
      ).then(() => {
        toast.success("Suggestion submitted successfully.");
        setSuggestionCategory("");
        setSuggestionText("");
      }).catch((error) => {
        console.error("Error submitting suggestion:", error);
        toast.error("Failed to submit suggestion. Please try again later.");
      });
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      toast.error("Failed to submit suggestion. Please try again later.");
    } finally {
      setSubmitting(false);
      closeModel(); 
    }
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
          <Button onClick={handleSubmitSuggestion} disabled={submitting} loading={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSuggestion;
