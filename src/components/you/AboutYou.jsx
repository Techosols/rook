import { useState, useEffect } from "react";

import Button from "../ui/Button";
import FormSection from "../ui/FormSection";
import { SmileIcon, AnnoyedIcon, FrownIcon, LucideBadgeInfo } from "lucide-react";
import useProfile from "../../hooks/useProfile";
import useOption from "../../hooks/useOption";
import PrivateApi from "../../services/privateApi";


function AboutYou() {

  const [content, setContent] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const { profile, isProfileLoading } = useProfile();
  const { convoStarters } = useOption();

  useEffect(() => {
    if (!isProfileLoading) {
      setContent(profile?.aboutMe || "");
    }
  }, [profile]);

  async function sentimentAnalysis() {
    if (content.length === 0) {
      setSentiment(null);
      return;
    }
    PrivateApi.post('v1/sentiment', content)
      .then((res) => {
        setSentiment(res.data.sentiment);
      })
      .catch((err) => {
        console.error("ERR_SENTIMENT_ANALYSIS", err);
      });
  }

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <div className=''>
        <textarea
          name=""
          id=""
          rows="10"
          className='border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary'
          placeholder="Tell us about yourself..."
          value={content}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 5000) return;
            setContent(value);
            if (value.length === 0) setSentiment(null);
          }}
          onInput={sentimentAnalysis}
        ></textarea>
        <p className="flex justify-end text-gray-500">{content.length}/5000</p>
        <div className='flex flex-col md:flex-row items-center space-x-2'>
          <Button text={"Save"} active={content.length > 0} disabled={content.length === 0} className={"mt-2"} />
          <div className="flex items-center mt-2">
            <SmileIcon className={`ml-2 text-gray-500 ${sentiment !== null && sentiment === 0 ? 'text-primary' : ''} hover:cursor-pointer`} size={30}/>
            <FrownIcon className={`ml-2 text-gray-500 ${sentiment !== null && sentiment === 1 ? 'text-primary' : ''} hover:cursor-pointer`} size={30} />
            <AnnoyedIcon className={`ml-2 text-gray-500 ${sentiment !== null && sentiment === 2 ? 'text-primary' : ''} hover:cursor-pointer`} size={30} />
          </div>
          <p className="mt-2 text-gray-500">
            <span className={`${sentiment !== null && sentiment === 0 ? 'text-primary' : ''}`}>Positive</span>/
            <span className={`${sentiment !== null && sentiment === 1 ? 'text-primary' : ''}`}>Neutral</span>/
            <span className={`${sentiment !== null && sentiment === 2 ? 'text-primary' : ''}`}>Negative</span>/
            <span className={`${sentiment !== null && sentiment === 3 ? 'text-primary' : ''}`}>Mixed</span>
          </p>
        </div>
        
      </div>

      <FormSection title={"Conservation Starters"}>
        <p className="text-sm flex items-center text-gray-500"><LucideBadgeInfo className="mr-2 text-gray-500 inline" size={16}  /> Save some short sentences that others can use, to start conversations with you. </p>
        <div>
          <textarea
            rows={3}
            className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary placeholder:text-gray-400"
            placeholder={'Ask me about about my new puppy.\n Ask me about my recent vacation to Brazil.'}
          >
            {convoStarters && Array.isArray(convoStarters) ? convoStarters.join("\n") : convoStarters && Object.values(convoStarters).join("\n")}
          </textarea>
        </div>
      </FormSection>

    </div>
  )
}

export default AboutYou
