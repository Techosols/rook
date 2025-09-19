import { useState, useEffect } from "react";

import Button from "../ui/Button";
import FormSection from "../ui/FormSection";
import { SmileIcon, AnnoyedIcon, FrownIcon, LucideBadgeInfo } from "lucide-react";
import useProfile from "../../hooks/useProfile";
import useOption from "../../hooks/useOption";
import useAuthenticatedApi from "../../hooks/useAuthenticatedAPi";
import { toast } from "react-toastify";

import userService from "../../services/user";


function AboutYou() {

  const api = useAuthenticatedApi();

  const [content, setContent] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [convoStarter, setConvoStarter] = useState("");
  const { profile, isProfileLoading } = useProfile();
  const { convoStarters } = useOption();

  //Loading States
  const [contentUpdateLoading, setContentUpdateLoading] = useState(false);
  const [convoStartersUpdateLoading, setConvoStartersUpdateLoading] = useState(false);



  async function sentimentAnalysis() {
    if (content.length === 0) {
      setSentiment(null);
      return;
    }
    api.post('v1/sentiment', content)
      .then((res) => {
        setSentiment(res.data.sentiment);
      })
      .catch((err) => {
        console.error("ERR_SENTIMENT_ANALYSIS", err);
      });
  }

  function saveBio() {
    if (content.length === 0) return;
    setContentUpdateLoading(true);
    try {
      userService.updateUserProfile(api, {
        aboutMe: content,
      });
    } catch (error) {
      console.error("ERR_UPDATE_BIO", error);
    } finally {
      setContentUpdateLoading(false);
    }
  }

  function saveConvoStarters() {
    const startersArr = convoStarter.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    if (startersArr.length === 0) return;
    setConvoStartersUpdateLoading(true);
    
    try {
      api.put('v1/strings/convostarters', startersArr)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Conversation Starters updated successfully!');
        }
      })
      .catch((err) => {
        toast.error('Failed to update Conversation Starters');
        console.error("ERR_UPDATE_CONVO_STARTERS", err);
      });
    }
    catch (error) {
      console.error("ERR_UPDATE_CONVO_STARTERS", error);
    } finally {
      setConvoStartersUpdateLoading(false);
    }
  }

  useEffect(() => {
    if (!isProfileLoading) {
      setContent(profile?.aboutMe || "");
      setSentiment(null);
      setConvoStarter(convoStarters && Array.isArray(convoStarters) ? convoStarters.join("\n") : convoStarters && Object.values(convoStarters).join("\n"));
    }
  }, [profile]);

  



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
          <Button text={"Save"} active={content.length > 0} disabled={content.length === 0 || contentUpdateLoading} className={"mt-2"} onClick={saveBio} />
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

      <FormSection title={"Conversation Starters"} loading={convoStartersUpdateLoading} onSave={saveConvoStarters} className={"mt-4"}>
        <p className="text-sm flex items-center text-gray-500"><LucideBadgeInfo className="mr-2 text-gray-500 inline" size={16}  /> Save some short sentences that others can use, to start conversations with you. </p>
        <div>
          <textarea
            rows={3}
            className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary placeholder:text-gray-400"
            placeholder={'Ask me about about my new puppy.\n Ask me about my recent vacation to Brazil.'}
            value={convoStarter}
            onChange={(e) => { setConvoStarter(e.target.value); }}
            onKeyDown={e => {
              if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                const textarea = e.target;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;
                const newValue = value.substring(0, start) + '\n' + value.substring(end);
                textarea.value = newValue;
                textarea.selectionStart = textarea.selectionEnd = start + 1;
                // Optionally, update state if you want to allow editing
              }
            }}
          />
        </div>
      </FormSection>

    </div>
  )
}

export default AboutYou
