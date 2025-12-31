import { X, InfoIcon, Info } from "lucide-react";
import useModel from "../hooks/useModel";

import ProfilePercentageModel from "./models/ProfilePercentageModel";
import ProfileModel from "./models/ProfileModel";
import NoInternet from "./models/NoInternet";
import InvalidToken from "./models/InvalidToken";
import SessionExpire from "./models/SessionExpire";
import DisconnectReason from "./models/DisconnectReason";
import ProfileSuggestion from "./models/ProfileSuggestion";

function Model() {
  const { model, closeModel } = useModel();

  return (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-background-dark rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-lg mx-auto my-8 relative animate-fade-in max-h-[calc(100vh-2rem)] overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className="flex">
          <div className="flex items-center gap-2 w-full mt-2">
            <div className="mb-2">
              <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full p-2 mt-1">
                <InfoIcon className="h-7 w-7" />
              </span>
            </div>
            <h2 className="text-xl font-bold text-center mb-1 dark:text-white">{model?.heading || "Information"}</h2>
            {model?.description && (
              <p className="text-gray-600 dark:text-gray-300 text-center mb-2">{model.description}</p>
            )}
          </div>
          
          {model && <button
            onClick={closeModel}
            className="absolute top-3 right-3 text-gray-400 hover:text-primary transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>}
        </div>
        <div className="mt-4">
          {model?.for == 'profilePercentage' && <ProfilePercentageModel data={model?.data} />}
          {model?.for == 'profile' && <ProfileModel />}
          {model?.for == 'noInternet' && <NoInternet />}
          {model?.for == 'invalidToken' && <InvalidToken />}
          {model?.for == 'sessionExpire' && <SessionExpire />}
          {model?.for == 'disconnectReason' && <DisconnectReason />}
          {model?.for == 'profileSuggestion' && <ProfileSuggestion />}
        </div>
      </div>
    </div>
  );
}

export default Model;