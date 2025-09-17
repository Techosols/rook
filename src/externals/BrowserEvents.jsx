import { useEffect } from "react";

import useModel from "../hooks/useModel";

function BrowserEvents() {
  const { openModel, closeModel } = useModel();

  // Handle No Internet Connection globally
  useEffect(() => {
    function handleOffline() {
      if (!window?.navigator?.onLine) {
        openModel({ for: 'noInternet', heading: 'No Internet', dissmissible: false });
      }
    }

    function handleOnline() {
      closeModel();
      window.location.reload();
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Check on mount
    if (!window?.navigator?.onLine) {
      openModel({ for: 'noInternet', heading: 'No Internet', dissmissible: false });
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [openModel, closeModel]);

  
  return null;
}

export default BrowserEvents
