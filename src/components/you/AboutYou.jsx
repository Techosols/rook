import { useState, useEffect } from "react";

import Button from "../ui/Button";
import FormSection from "../ui/FormSection";
import AiEnhance from "./sections/AiEnhance";
import { SmileIcon, AnnoyedIcon, FrownIcon, LucideBadgeInfo } from "lucide-react";
import useProfile from "../../hooks/useProfile";


function AboutYou() {

  const [content, setContent] = useState("");
  const { profile, isProfileLoading } = useProfile();

  useEffect(() => {
    if (!isProfileLoading) {
      setContent(profile.aboutMe || "");
    }
  }, [profile]);

  return (
    <div className='p-1 flex flex-col gap-1 md:gap-4'>
      <div className=''>
        <textarea name="" id="" rows="10" className='border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary' placeholder="Tell us about yourself..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <p className="flex justify-end text-gray-500">{content.length}/5000</p>
        <div className='flex flex-col md:flex-row items-center space-x-2'>
          <Button text={"Save"} active={content.length > 0} disabled={content.length === 0} className={"mt-2"} />
          <div className="flex items-center mt-2">
            <SmileIcon className="ml-2 text-gray-500 hover:text-red-500 hover:cursor-pointer" size={30}/>
            <FrownIcon className="ml-2 text-gray-500 hover:text-red-500 hover:cursor-pointer" size={30} />
            <AnnoyedIcon className="ml-2 text-gray-500 hover:text-red-500 hover:cursor-pointer" size={30} />
          </div>
          <p className="mt-2 text-gray-500">Positive/Neutral/Negative/Mixed</p>
        </div>
        
      </div>

      <FormSection title={"Conservation Starters"}>
        <p className="text-sm flex items-center text-gray-500"><LucideBadgeInfo className="mr-2 text-gray-500 inline" size={16}  /> Save some short sentences that others can use, to start conversations with you. </p>
        <div>
          <textarea rows={3} className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary placeholder:text-gray-400" placeholder="Ask me about my new puppy&#10;Ask me about my recent vacation to Brazil."></textarea>
        </div>
      </FormSection>

      <AiEnhance />

    </div>
  )
}

export default AboutYou
