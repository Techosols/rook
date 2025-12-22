import { useState } from "react";

import Button from "../ui/Button";
import FormSection from "../ui/FormSection";
import { SmileIcon, AnnoyedIcon, FrownIcon, LucideBadgeInfo } from "lucide-react";
import useProfile from "../../hooks/useProfile";
import useOption from "../../hooks/useOption";
import useAuthenticatedApi from "../../hooks/useAuthenticatedApi";
import { toast } from "react-toastify";


function AboutYou() {

  const api = useAuthenticatedApi();

  const [sentiment, setSentiment] = useState(null);
  const { isProfileLoading, aboutMe, setAboutMe } = useProfile();
  const { convoStarters, setConvoStarters } = useOption();

  //Loading States
  const [contentUpdateLoading, setContentUpdateLoading] = useState(false);
  const [convoStartersUpdateLoading, setConvoStartersUpdateLoading] = useState(false);



  async function sentimentAnalysis() {
    if (aboutMe.length === 0) {
      setSentiment(null);
      return;
    }
    api.post('v1/sentiment', aboutMe)
      .then((res) => {
        setSentiment(res.data.sentiment);
      })
      .catch((err) => {
        console.error("ERR_SENTIMENT_ANALYSIS", err);
      });
  }

  async function saveBio() {
    if (aboutMe.length === 0) return;
    setContentUpdateLoading(true);
    
    try {
      const res = await api.post('v1/actions/record', {
        "object": "event",
        "type": "user.about-me",
        "data": {
          "occurredAt": new Date().toISOString(),
          "notes": aboutMe
        }
      });
      
      if (res.status === 200) {
        toast.success('Your changes were saved successfully!');
      }
    } catch (err) {
      if (err?.status === 400) {
        const errs = err?.response?.data?.errors?.Error;
        console.error("ERR_UPDATE_BIO", errs);
        if (errs && errs.length > 0) {
          errs.forEach(e => {
            toast.error(e);
          });
        }
      } else {
        toast.error('Failed to save changes. Please try again.');
        console.error("ERR_UPDATE_BIO", err);
      }
    } finally {
      setContentUpdateLoading(false);
    }
  }

  async function saveConvoStarters() {
    const startersArr = convoStarters.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    if (startersArr.length === 0) return;
    setConvoStartersUpdateLoading(true);

    try {
      const res = await api.put('v1/strings/convostarters', startersArr);
      if (res.status === 200) {
        toast.success('Conversation Starters updated successfully!');
      }
    } catch (err) {
      toast.error('Failed to update Conversation Starters');
      console.error("ERR_UPDATE_CONVO_STARTERS", err);
    } finally {
      setConvoStartersUpdateLoading(false);
    }
  }







  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900'>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            About You
          </h1>
        </div>

        {/* Bio Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="p-6">
            {isProfileLoading ? (
              <>
                <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse mt-4 w-24 ml-auto"></div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    name=""
                    id=""
                    rows="12"
                    className='w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200 resize-none font-medium leading-relaxed'
                    placeholder="Tell us about yourself... What are your passions? What makes you laugh? What are you looking for in a connection? Share anything that helps others understand who you are."
                    value={aboutMe}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length > 5000) return;
                      setAboutMe(value);
                      if (value.length === 0) setSentiment(null);
                    }}
                    onBlur={sentimentAnalysis}
                  ></textarea>
                  
                  {/* Character Counter */}
                  <div className="absolute bottom-3 right-3">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      aboutMe.length > 4500 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                        : aboutMe.length > 4000
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {aboutMe.length}/5000
                    </span>
                  </div>
                </div>
              </div>
            )}
            {/* Sentiment Analysis & Save Section */}
            {isProfileLoading ? (
              <div className="flex flex-col lg:flex-row items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg animate-pulse w-32"></div>
                <div className="flex items-center mt-4 lg:mt-0 space-x-4">
                  <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse"></div>
                  <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse"></div>
                  <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col lg:flex-row items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4 lg:space-y-0'>
                {/* Save Button */}
                <div className="relative group/btn">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-xl blur-lg opacity-30 group-hover/btn:opacity-50 transition-opacity duration-300"></div>
                  <Button 
                    text={"Save Changes"} 
                    active={aboutMe.length > 0} 
                    disabled={aboutMe.length === 0 || contentUpdateLoading} 
                    loading={contentUpdateLoading} 
                    onClick={saveBio}
                    className="relative px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
                  />
                </div>

                {/* Sentiment Analysis */}
                <div className="flex items-center flex-col sm:flex-row gap-3 sm:gap-0 space-x-6">
                  <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-2">
                    <SmileIcon 
                      className={`transition-all duration-200 cursor-pointer hover:scale-110 ${
                        sentiment !== null && sentiment === 0 
                          ? 'text-green-500' 
                          : 'text-gray-400 hover:text-green-400'
                      }`} 
                      size={28} 
                    />
                    <FrownIcon 
                      className={`transition-all duration-200 cursor-pointer hover:scale-110 ${
                        sentiment !== null && sentiment === 1 
                          ? 'text-blue-500' 
                          : 'text-gray-400 hover:text-blue-400'
                      }`} 
                      size={28} 
                    />
                    <AnnoyedIcon 
                      className={`transition-all duration-200 cursor-pointer hover:scale-110 ${
                        sentiment !== null && sentiment === 2 
                          ? 'text-red-500' 
                          : 'text-gray-400 hover:text-red-400'
                      }`} 
                      size={28} 
                    />
                  </div>
                  
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    <span className={`transition-colors duration-200 ${sentiment !== null && sentiment === 0 ? 'text-green-500 font-semibold' : ''}`}>Positive</span>
                    <span className="mx-1 text-gray-300">/</span>
                    <span className={`transition-colors duration-200 ${sentiment !== null && sentiment === 1 ? 'text-blue-500 font-semibold' : ''}`}>Neutral</span>
                    <span className="mx-1 text-gray-300">/</span>
                    <span className={`transition-colors duration-200 ${sentiment !== null && sentiment === 2 ? 'text-red-500 font-semibold' : ''}`}>Negative</span>
                    <span className="mx-1 text-gray-300">/</span>
                    <span className={`transition-colors duration-200 ${sentiment !== null && sentiment === 3 ? 'text-purple-500 font-semibold' : ''}`}>Mixed</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      <FormSection title={"Conversation Starters"} loading={convoStartersUpdateLoading} onSave={saveConvoStarters} className={"mt-4"}>
        {isProfileLoading ? (
          <>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3 w-3/4"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </>
        ) : (
          <>
            <p className="text-sm flex items-center text-gray-500"><LucideBadgeInfo className="mr-2 text-gray-500 inline" size={16} /> Save some short sentences that others can use, to start conversations with you. </p>
            <div>
              <textarea
                rows={3}
                className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary placeholder:text-gray-400"
                placeholder={'Ask me about my new puppy.\nAsk me about my recent vacation to Brazil.'}
                value={Array.isArray(convoStarters) 
                  ? convoStarters.join('\n') 
                  : convoStarters?.split(',').map(item => item.trim()).join('\n') || ''
                }
                onChange={(e) => { 
                  setConvoStarters(e.target.value); 
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    e.preventDefault();
                    const textarea = e.target;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;
                    const value = textarea.value;
                    const newValue = value.substring(0, start) + '\n' + value.substring(end);
                    textarea.value = newValue;
                    textarea.selectionStart = textarea.selectionEnd = start + 1
                  }
                }}
              />
            </div>
          </>
        )}
        </FormSection>
      </div>
    </div>
  )
}

export default AboutYou
